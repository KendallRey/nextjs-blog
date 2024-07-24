type IQueryParams = {
  page?: number;
};

type IFilters = Record<string, any> & IQueryParams;

type IOrdering = Record<string, any> & {
  order?: "asc" | "desc" | false;
  orderBy?: string;
};

type IApiParams = IFilters & IOrdering;
