export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetUsersQuery {
  constructor(
    public readonly page?: number,
    public readonly pageSize?: number,
    public readonly search?: string,
  ) {}
}
