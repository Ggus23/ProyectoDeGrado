import { Docente } from './entities/docente.entity';
import { OAuthAccount } from './entities/oauth-account.entity';
import { PgfDocument } from './entities/pgf-document.entity';
import { PgfUnit } from './entities/pgf-unit.entity';
import { Strategy } from './entities/strategy.entity';
import { Rubric } from './entities/rubric.entity';
import { Alignment } from './entities/alignment.entity';
import { SequenceItem } from './entities/sequence-item.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { Upload } from './entities/upload.entity';
import { User } from './entities/user.entity';

export const entities = [
  Docente,
  OAuthAccount,
  PgfDocument,
  PgfUnit,
  Strategy,
  Rubric,
  Alignment,
  SequenceItem,
  ChecklistItem,
  Upload,
  User
];
export {
  Docente,
  OAuthAccount,
  PgfDocument,
  PgfUnit,
  Strategy,
  Rubric,
  Alignment,
  SequenceItem,
  ChecklistItem,
  Upload,
  User
};
