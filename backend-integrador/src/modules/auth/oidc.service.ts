// src/modules/auth/oidc.service.ts
import { Injectable } from '@nestjs/common';
import { Issuer, Client, generators } from 'openid-client';

export type ProviderKind = 'google' | 'msft' | 'custom';

@Injectable()
export class OidcService {
  private client?: Client;
  private codeVerifier?: string;
  private state?: string; 
  async getClient(): Promise<Client> {
    if (this.client) return this.client;

    const provider = (process.env.OAUTH_PROVIDER || 'google') as ProviderKind;
    const client_id = process.env.OAUTH_CLIENT_ID;
    const client_secret = process.env.OAUTH_CLIENT_SECRET;
    const redirect_uri = process.env.OAUTH_CALLBACK_URL;
    const issuerUrl = process.env.OIDC_ISSUER_URL; 

    if (!client_id || !client_secret || !redirect_uri) {
      throw new Error(
        `OIDC misconfigurado:
         OAUTH_CLIENT_ID=${client_id ? 'OK' : 'MISSING'}
         OAUTH_CLIENT_SECRET=${client_secret ? 'OK' : 'MISSING'}
         OAUTH_CALLBACK_URL=${redirect_uri ? 'OK' : 'MISSING'}`
      );
    }

    let issuer: Issuer<Client>;

    if (issuerUrl) {
      
      issuer = await Issuer.discover(issuerUrl);
    } else {
      
      issuer =
        provider === 'msft'
          ? await Issuer.discover('https://login.microsoftonline.com/common/v2.0')
          : await Issuer.discover('https://accounts.google.com');
    }

    this.client = new issuer.Client({
      client_id,
      client_secret,
      redirect_uris: [redirect_uri],
      response_types: ['code'],
    });

    return this.client;
  }

  createAuthUrl(redirectBack?: string): string {
    const client = this.client!;
    this.codeVerifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(this.codeVerifier);

    const payload = {
      rnd: generators.state(),
      redirect_uri: redirectBack || '',
    };
    this.state = JSON.stringify(payload);

    return client.authorizationUrl({
      scope: 'openid email profile',
      code_challenge,
      code_challenge_method: 'S256',
      state: this.state,
      redirect_uri: process.env.OAUTH_CALLBACK_URL!,
    });
  }

  async callback(params: Record<string, any>) {
    const client = this.client!;
    const tokens = await client.callback(process.env.OAUTH_CALLBACK_URL!, params, {
      code_verifier: this.codeVerifier,
      state: this.state,
    });

    let redirectBack: string | undefined;
    try {
      const parsed = JSON.parse(String(params.state || ''));
      redirectBack = parsed?.redirect_uri || undefined;
    } catch {
      redirectBack = undefined;
    }

    const userinfo = await client.userinfo(tokens.access_token!);
    return { tokens, userinfo,redirectBack };
  }
}

