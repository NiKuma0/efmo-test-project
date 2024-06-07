export class UserCreatedRequest {
  entityId: number;
}

export class UserUpdatedRequest {
  entityId: number;
  changedColumns: string[];
}
