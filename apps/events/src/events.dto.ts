export class UserCreatedEventData {
  entityId: number;
}

export class UserUpdatedEventData {
  entityId: number;
  changedColumns: string[];
}
