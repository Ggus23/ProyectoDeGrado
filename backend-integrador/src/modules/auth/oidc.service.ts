
import { Injectable } from '@nestjs/common';
import { Issuer, Client, generators, TokenSet } from 'openid-client';
export type ProviderKind = 'google' | 'msft';
@Injectable()
export class OidcService {
  private client?: Client; private codeVerifier?: string;
  async getClient(): Promise<Client> {
    if (this.client) return this.client;
    const provider = (process.env.OAUTH_PROVIDER || 'google') as ProviderKind;
    const { OAUTH_CLIENT_ID: client_id, OAUTH_CLIENT_SECRET: client_secret, OAUTH_CALLBACK_URL } = process.env as any;
    const issuer = provider === 'google' ? await Issuer.discover('https://accounts.google.com') : await Issuer.discover('https://login.microsoftonline.com/common/v2.0');
    this.client = new issuer.Client({ client_id, client_secret, redirect_uris: [OAUTH_CALLBACK_URL], response_types: ['code'] });
    return this.client;
  }
  createAuthUrl(): string {
    const client = this.client!; this.codeVerifier = generators.codeVerifier(); const code_challenge = generators.codeChallenge(this.codeVerifier);
    return client.authorizationUrl({ scope: 'openid email profile', code_challenge, code_challenge_method: 'S256' });
  }
  async callback(params: Record<string, any>) {
    const client = this.client!;
    const tokens = await client.callback(process.env.OAUTH_CALLBACK_URL!, params, { code_verifier: this.codeVerifier });
    const userinfo = await client.userinfo(tokens.access_token!);
    return { tokens, userinfo };
  }
}
