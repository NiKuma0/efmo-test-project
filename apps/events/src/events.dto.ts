export class CreatedEventData {
  entityId: number;
}

export class UpdatedEventData {
  entityId: number;
  changedColumns: string[];
}
