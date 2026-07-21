import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { SyncOperation } from '../sync.service';

enum SyncAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

class SyncOperationDto implements SyncOperation {
  @IsEnum(SyncAction)
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @IsNotEmpty()
  payload: any;

  @IsNumber()
  timestamp: number;

  @IsString()
  clientId: string;

  @IsString()
  entityId: string;

  @IsString()
  entityType: string;
}

export class SyncBatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyncOperationDto)
  operations: SyncOperationDto[];
}
