
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  username: string
  hash: string
  salt: string
  createdAt: Date
}

/**
 * Model Service
 * 
 */
export type Service = {
  id: number
  name: string
  status: ServiceStatus
  hosts: string[]
  imageId: number
  containerInfoId: number | null
  projectId: number
  order: number
  createdAt: Date
  userId: number
}

/**
 * Model Image
 * 
 */
export type Image = {
  id: number
  name: string
  tag: string
  repository: string
  createdAt: Date
}

/**
 * Model ContainerInfo
 * 
 */
export type ContainerInfo = {
  id: number
  name: string
  network: string
  containerId: string
}

/**
 * Model EnvironmentVariable
 * 
 */
export type EnvironmentVariable = {
  id: number
  key: string
  value: string
  serviceId: number
}

/**
 * Model Redirect
 * 
 */
export type Redirect = {
  id: number
  from: string
  to: string
  serviceId: number
}

/**
 * Model Project
 * 
 */
export type Project = {
  id: number
  name: string
  createdAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const ServiceStatus: {
  PULLING: 'PULLING',
  CREATED: 'CREATED',
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  ERROR: 'ERROR'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<GlobalReject>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<GlobalReject>;

  /**
   * `prisma.containerInfo`: Exposes CRUD operations for the **ContainerInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContainerInfos
    * const containerInfos = await prisma.containerInfo.findMany()
    * ```
    */
  get containerInfo(): Prisma.ContainerInfoDelegate<GlobalReject>;

  /**
   * `prisma.environmentVariable`: Exposes CRUD operations for the **EnvironmentVariable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnvironmentVariables
    * const environmentVariables = await prisma.environmentVariable.findMany()
    * ```
    */
  get environmentVariable(): Prisma.EnvironmentVariableDelegate<GlobalReject>;

  /**
   * `prisma.redirect`: Exposes CRUD operations for the **Redirect** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Redirects
    * const redirects = await prisma.redirect.findMany()
    * ```
    */
  get redirect(): Prisma.RedirectDelegate<GlobalReject>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.1.1
   * Query Engine version: 8d8414deb360336e4698a65aa45a1fbaf1ce13d8
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Service: 'Service',
    Image: 'Image',
    ContainerInfo: 'ContainerInfo',
    EnvironmentVariable: 'EnvironmentVariable',
    Redirect: 'Redirect',
    Project: 'Project'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    Service: number
  }

  export type UserCountOutputTypeSelect = {
    Service?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ServiceCountOutputType
   */


  export type ServiceCountOutputType = {
    environmentVariables: number
    redirects: number
  }

  export type ServiceCountOutputTypeSelect = {
    environmentVariables?: boolean
    redirects?: boolean
  }

  export type ServiceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServiceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ServiceCountOutputType
    : S extends undefined
    ? never
    : S extends ServiceCountOutputTypeArgs
    ?'include' extends U
    ? ServiceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ServiceCountOutputType ? ServiceCountOutputType[P] : never
  } 
    : ServiceCountOutputType
  : ServiceCountOutputType




  // Custom InputTypes

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     * 
    **/
    select?: ServiceCountOutputTypeSelect | null
  }



  /**
   * Count Type ImageCountOutputType
   */


  export type ImageCountOutputType = {
    services: number
  }

  export type ImageCountOutputTypeSelect = {
    services?: boolean
  }

  export type ImageCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ImageCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ImageCountOutputType
    : S extends undefined
    ? never
    : S extends ImageCountOutputTypeArgs
    ?'include' extends U
    ? ImageCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ImageCountOutputType ? ImageCountOutputType[P] : never
  } 
    : ImageCountOutputType
  : ImageCountOutputType




  // Custom InputTypes

  /**
   * ImageCountOutputType without action
   */
  export type ImageCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ImageCountOutputType
     * 
    **/
    select?: ImageCountOutputTypeSelect | null
  }



  /**
   * Count Type ProjectCountOutputType
   */


  export type ProjectCountOutputType = {
    services: number
  }

  export type ProjectCountOutputTypeSelect = {
    services?: boolean
  }

  export type ProjectCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProjectCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProjectCountOutputType
    : S extends undefined
    ? never
    : S extends ProjectCountOutputTypeArgs
    ?'include' extends U
    ? ProjectCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ProjectCountOutputType ? ProjectCountOutputType[P] : never
  } 
    : ProjectCountOutputType
  : ProjectCountOutputType




  // Custom InputTypes

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     * 
    **/
    select?: ProjectCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    hash: string | null
    salt: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    hash: string | null
    salt: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    hash: number
    salt: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    salt?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    salt?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    hash?: true
    salt?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    username: string
    hash: string
    salt: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    username?: boolean
    hash?: boolean
    salt?: boolean
    createdAt?: boolean
    Service?: boolean | ServiceFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    Service?: boolean | ServiceFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Service' ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Service' ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Service<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Service
   */


  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
    imageId: number | null
    containerInfoId: number | null
    projectId: number | null
    order: number | null
    userId: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
    imageId: number | null
    containerInfoId: number | null
    projectId: number | null
    order: number | null
    userId: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    status: ServiceStatus | null
    imageId: number | null
    containerInfoId: number | null
    projectId: number | null
    order: number | null
    createdAt: Date | null
    userId: number | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    status: ServiceStatus | null
    imageId: number | null
    containerInfoId: number | null
    projectId: number | null
    order: number | null
    createdAt: Date | null
    userId: number | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    status: number
    hosts: number
    imageId: number
    containerInfoId: number
    projectId: number
    order: number
    createdAt: number
    userId: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
    imageId?: true
    containerInfoId?: true
    projectId?: true
    order?: true
    userId?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
    imageId?: true
    containerInfoId?: true
    projectId?: true
    order?: true
    userId?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    imageId?: true
    containerInfoId?: true
    projectId?: true
    order?: true
    createdAt?: true
    userId?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    imageId?: true
    containerInfoId?: true
    projectId?: true
    order?: true
    createdAt?: true
    userId?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    hosts?: true
    imageId?: true
    containerInfoId?: true
    projectId?: true
    order?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type ServiceAggregateArgs = {
    /**
     * Filter which Service to aggregate.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs = {
    where?: ServiceWhereInput
    orderBy?: Enumerable<ServiceOrderByWithAggregationInput>
    by: Array<ServiceScalarFieldEnum>
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }


  export type ServiceGroupByOutputType = {
    id: number
    name: string
    status: ServiceStatus
    hosts: string[]
    imageId: number
    containerInfoId: number | null
    projectId: number
    order: number
    createdAt: Date
    userId: number
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect = {
    id?: boolean
    name?: boolean
    status?: boolean
    hosts?: boolean
    image?: boolean | ImageArgs
    imageId?: boolean
    environmentVariables?: boolean | EnvironmentVariableFindManyArgs
    redirects?: boolean | RedirectFindManyArgs
    containerInfo?: boolean | ContainerInfoArgs
    containerInfoId?: boolean
    project?: boolean | ProjectArgs
    projectId?: boolean
    order?: boolean
    createdAt?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  export type ServiceInclude = {
    image?: boolean | ImageArgs
    environmentVariables?: boolean | EnvironmentVariableFindManyArgs
    redirects?: boolean | RedirectFindManyArgs
    containerInfo?: boolean | ContainerInfoArgs
    project?: boolean | ProjectArgs
    user?: boolean | UserArgs
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  export type ServiceGetPayload<
    S extends boolean | null | undefined | ServiceArgs,
    U = keyof S
      > = S extends true
        ? Service
    : S extends undefined
    ? never
    : S extends ServiceArgs | ServiceFindManyArgs
    ?'include' extends U
    ? Service  & {
    [P in TrueKeys<S['include']>]:
        P extends 'image' ? ImageGetPayload<S['include'][P]> :
        P extends 'environmentVariables' ? Array < EnvironmentVariableGetPayload<S['include'][P]>>  :
        P extends 'redirects' ? Array < RedirectGetPayload<S['include'][P]>>  :
        P extends 'containerInfo' ? ContainerInfoGetPayload<S['include'][P]> | null :
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends '_count' ? ServiceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'image' ? ImageGetPayload<S['select'][P]> :
        P extends 'environmentVariables' ? Array < EnvironmentVariableGetPayload<S['select'][P]>>  :
        P extends 'redirects' ? Array < RedirectGetPayload<S['select'][P]>>  :
        P extends 'containerInfo' ? ContainerInfoGetPayload<S['select'][P]> | null :
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends '_count' ? ServiceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Service ? Service[P] : never
  } 
    : Service
  : Service


  type ServiceCountArgs = Merge<
    Omit<ServiceFindManyArgs, 'select' | 'include'> & {
      select?: ServiceCountAggregateInputType | true
    }
  >

  export interface ServiceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServiceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServiceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs>(
      args?: SelectSubset<T, ServiceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs>(
      args: SelectSubset<T, ServiceCreateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Create many Services.
     *     @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     *     @example
     *     // Create many Services
     *     const service = await prisma.service.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServiceCreateManyArgs>(
      args?: SelectSubset<T, ServiceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs>(
      args: SelectSubset<T, ServiceDeleteArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs>(
      args: SelectSubset<T, ServiceUpdateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs>(
      args?: SelectSubset<T, ServiceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs>(
      args: SelectSubset<T, ServiceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs>(
      args: SelectSubset<T, ServiceUpsertArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Find one Service that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ServiceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Find the first Service that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ServiceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServiceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    image<T extends ImageArgs = {}>(args?: Subset<T, ImageArgs>): CheckSelect<T, Prisma__ImageClient<Image | null >, Prisma__ImageClient<ImageGetPayload<T> | null >>;

    environmentVariables<T extends EnvironmentVariableFindManyArgs = {}>(args?: Subset<T, EnvironmentVariableFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EnvironmentVariable>>, PrismaPromise<Array<EnvironmentVariableGetPayload<T>>>>;

    redirects<T extends RedirectFindManyArgs = {}>(args?: Subset<T, RedirectFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Redirect>>, PrismaPromise<Array<RedirectGetPayload<T>>>>;

    containerInfo<T extends ContainerInfoArgs = {}>(args?: Subset<T, ContainerInfoArgs>): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo | null >, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T> | null >>;

    project<T extends ProjectArgs = {}>(args?: Subset<T, ProjectArgs>): CheckSelect<T, Prisma__ProjectClient<Project | null >, Prisma__ProjectClient<ProjectGetPayload<T> | null >>;

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Service base type for findUnique actions
   */
  export type ServiceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where: ServiceWhereUniqueInput
  }

  /**
   * Service: findUnique
   */
  export interface ServiceFindUniqueArgs extends ServiceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Service base type for findFirst actions
   */
  export type ServiceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     * 
    **/
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }

  /**
   * Service: findFirst
   */
  export interface ServiceFindFirstArgs extends ServiceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Services to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service create
   */
  export type ServiceCreateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to create a Service.
     * 
    **/
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs = {
    /**
     * The data used to create many Services.
     * 
    **/
    data: Enumerable<ServiceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Service update
   */
  export type ServiceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to update a Service.
     * 
    **/
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs = {
    /**
     * The data used to update Services.
     * 
    **/
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  export type ServiceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The filter to search for the Service to update in case it exists.
     * 
    **/
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     * 
    **/
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  export type ServiceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter which Service to delete.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs = {
    /**
     * Filter which Services to delete
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service: findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs = ServiceFindUniqueArgsBase
      

  /**
   * Service: findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs = ServiceFindFirstArgsBase
      

  /**
   * Service without action
   */
  export type ServiceArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
  }



  /**
   * Model Image
   */


  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageAvgAggregateOutputType = {
    id: number | null
  }

  export type ImageSumAggregateOutputType = {
    id: number | null
  }

  export type ImageMinAggregateOutputType = {
    id: number | null
    name: string | null
    tag: string | null
    repository: string | null
    createdAt: Date | null
  }

  export type ImageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    tag: string | null
    repository: string | null
    createdAt: Date | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    name: number
    tag: number
    repository: number
    createdAt: number
    _all: number
  }


  export type ImageAvgAggregateInputType = {
    id?: true
  }

  export type ImageSumAggregateInputType = {
    id?: true
  }

  export type ImageMinAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    repository?: true
    createdAt?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    repository?: true
    createdAt?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    name?: true
    tag?: true
    repository?: true
    createdAt?: true
    _all?: true
  }

  export type ImageAggregateArgs = {
    /**
     * Filter which Image to aggregate.
     * 
    **/
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs = {
    where?: ImageWhereInput
    orderBy?: Enumerable<ImageOrderByWithAggregationInput>
    by: Array<ImageScalarFieldEnum>
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _avg?: ImageAvgAggregateInputType
    _sum?: ImageSumAggregateInputType
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }


  export type ImageGroupByOutputType = {
    id: number
    name: string
    tag: string
    repository: string
    createdAt: Date
    _count: ImageCountAggregateOutputType | null
    _avg: ImageAvgAggregateOutputType | null
    _sum: ImageSumAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect = {
    id?: boolean
    name?: boolean
    tag?: boolean
    repository?: boolean
    services?: boolean | ServiceFindManyArgs
    createdAt?: boolean
    _count?: boolean | ImageCountOutputTypeArgs
  }

  export type ImageInclude = {
    services?: boolean | ServiceFindManyArgs
    _count?: boolean | ImageCountOutputTypeArgs
  }

  export type ImageGetPayload<
    S extends boolean | null | undefined | ImageArgs,
    U = keyof S
      > = S extends true
        ? Image
    : S extends undefined
    ? never
    : S extends ImageArgs | ImageFindManyArgs
    ?'include' extends U
    ? Image  & {
    [P in TrueKeys<S['include']>]:
        P extends 'services' ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends '_count' ? ImageCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'services' ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends '_count' ? ImageCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Image ? Image[P] : never
  } 
    : Image
  : Image


  type ImageCountArgs = Merge<
    Omit<ImageFindManyArgs, 'select' | 'include'> & {
      select?: ImageCountAggregateInputType | true
    }
  >

  export interface ImageDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ImageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ImageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Image'> extends True ? CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>> : CheckSelect<T, Prisma__ImageClient<Image | null >, Prisma__ImageClient<ImageGetPayload<T> | null >>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ImageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ImageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Image'> extends True ? CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>> : CheckSelect<T, Prisma__ImageClient<Image | null >, Prisma__ImageClient<ImageGetPayload<T> | null >>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ImageFindManyArgs>(
      args?: SelectSubset<T, ImageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Image>>, PrismaPromise<Array<ImageGetPayload<T>>>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
    **/
    create<T extends ImageCreateArgs>(
      args: SelectSubset<T, ImageCreateArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Create many Images.
     *     @param {ImageCreateManyArgs} args - Arguments to create many Images.
     *     @example
     *     // Create many Images
     *     const image = await prisma.image.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ImageCreateManyArgs>(
      args?: SelectSubset<T, ImageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
    **/
    delete<T extends ImageDeleteArgs>(
      args: SelectSubset<T, ImageDeleteArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ImageUpdateArgs>(
      args: SelectSubset<T, ImageUpdateArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ImageDeleteManyArgs>(
      args?: SelectSubset<T, ImageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ImageUpdateManyArgs>(
      args: SelectSubset<T, ImageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
    **/
    upsert<T extends ImageUpsertArgs>(
      args: SelectSubset<T, ImageUpsertArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Find one Image that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ImageFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Find the first Image that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ImageFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ImageClient<Image>, Prisma__ImageClient<ImageGetPayload<T>>>

    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ImageClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Image base type for findUnique actions
   */
  export type ImageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     * 
    **/
    where: ImageWhereUniqueInput
  }

  /**
   * Image: findUnique
   */
  export interface ImageFindUniqueArgs extends ImageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Image base type for findFirst actions
   */
  export type ImageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * Filter, which Image to fetch.
     * 
    **/
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     * 
    **/
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     * 
    **/
    distinct?: Enumerable<ImageScalarFieldEnum>
  }

  /**
   * Image: findFirst
   */
  export interface ImageFindFirstArgs extends ImageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Image findMany
   */
  export type ImageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * Filter, which Images to fetch.
     * 
    **/
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     * 
    **/
    orderBy?: Enumerable<ImageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     * 
    **/
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ImageScalarFieldEnum>
  }


  /**
   * Image create
   */
  export type ImageCreateArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * The data needed to create a Image.
     * 
    **/
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }


  /**
   * Image createMany
   */
  export type ImageCreateManyArgs = {
    /**
     * The data used to create many Images.
     * 
    **/
    data: Enumerable<ImageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Image update
   */
  export type ImageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * The data needed to update a Image.
     * 
    **/
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     * 
    **/
    where: ImageWhereUniqueInput
  }


  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs = {
    /**
     * The data used to update Images.
     * 
    **/
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     * 
    **/
    where?: ImageWhereInput
  }


  /**
   * Image upsert
   */
  export type ImageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * The filter to search for the Image to update in case it exists.
     * 
    **/
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     * 
    **/
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }


  /**
   * Image delete
   */
  export type ImageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
    /**
     * Filter which Image to delete.
     * 
    **/
    where: ImageWhereUniqueInput
  }


  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs = {
    /**
     * Filter which Images to delete
     * 
    **/
    where?: ImageWhereInput
  }


  /**
   * Image: findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs = ImageFindUniqueArgsBase
      

  /**
   * Image: findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs = ImageFindFirstArgsBase
      

  /**
   * Image without action
   */
  export type ImageArgs = {
    /**
     * Select specific fields to fetch from the Image
     * 
    **/
    select?: ImageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ImageInclude | null
  }



  /**
   * Model ContainerInfo
   */


  export type AggregateContainerInfo = {
    _count: ContainerInfoCountAggregateOutputType | null
    _avg: ContainerInfoAvgAggregateOutputType | null
    _sum: ContainerInfoSumAggregateOutputType | null
    _min: ContainerInfoMinAggregateOutputType | null
    _max: ContainerInfoMaxAggregateOutputType | null
  }

  export type ContainerInfoAvgAggregateOutputType = {
    id: number | null
  }

  export type ContainerInfoSumAggregateOutputType = {
    id: number | null
  }

  export type ContainerInfoMinAggregateOutputType = {
    id: number | null
    name: string | null
    network: string | null
    containerId: string | null
  }

  export type ContainerInfoMaxAggregateOutputType = {
    id: number | null
    name: string | null
    network: string | null
    containerId: string | null
  }

  export type ContainerInfoCountAggregateOutputType = {
    id: number
    name: number
    network: number
    containerId: number
    _all: number
  }


  export type ContainerInfoAvgAggregateInputType = {
    id?: true
  }

  export type ContainerInfoSumAggregateInputType = {
    id?: true
  }

  export type ContainerInfoMinAggregateInputType = {
    id?: true
    name?: true
    network?: true
    containerId?: true
  }

  export type ContainerInfoMaxAggregateInputType = {
    id?: true
    name?: true
    network?: true
    containerId?: true
  }

  export type ContainerInfoCountAggregateInputType = {
    id?: true
    name?: true
    network?: true
    containerId?: true
    _all?: true
  }

  export type ContainerInfoAggregateArgs = {
    /**
     * Filter which ContainerInfo to aggregate.
     * 
    **/
    where?: ContainerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContainerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<ContainerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContainerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContainerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContainerInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContainerInfos
    **/
    _count?: true | ContainerInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContainerInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContainerInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContainerInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContainerInfoMaxAggregateInputType
  }

  export type GetContainerInfoAggregateType<T extends ContainerInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateContainerInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContainerInfo[P]>
      : GetScalarType<T[P], AggregateContainerInfo[P]>
  }




  export type ContainerInfoGroupByArgs = {
    where?: ContainerInfoWhereInput
    orderBy?: Enumerable<ContainerInfoOrderByWithAggregationInput>
    by: Array<ContainerInfoScalarFieldEnum>
    having?: ContainerInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContainerInfoCountAggregateInputType | true
    _avg?: ContainerInfoAvgAggregateInputType
    _sum?: ContainerInfoSumAggregateInputType
    _min?: ContainerInfoMinAggregateInputType
    _max?: ContainerInfoMaxAggregateInputType
  }


  export type ContainerInfoGroupByOutputType = {
    id: number
    name: string
    network: string
    containerId: string
    _count: ContainerInfoCountAggregateOutputType | null
    _avg: ContainerInfoAvgAggregateOutputType | null
    _sum: ContainerInfoSumAggregateOutputType | null
    _min: ContainerInfoMinAggregateOutputType | null
    _max: ContainerInfoMaxAggregateOutputType | null
  }

  type GetContainerInfoGroupByPayload<T extends ContainerInfoGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContainerInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContainerInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContainerInfoGroupByOutputType[P]>
            : GetScalarType<T[P], ContainerInfoGroupByOutputType[P]>
        }
      >
    >


  export type ContainerInfoSelect = {
    id?: boolean
    name?: boolean
    network?: boolean
    containerId?: boolean
    service?: boolean | ServiceArgs
  }

  export type ContainerInfoInclude = {
    service?: boolean | ServiceArgs
  }

  export type ContainerInfoGetPayload<
    S extends boolean | null | undefined | ContainerInfoArgs,
    U = keyof S
      > = S extends true
        ? ContainerInfo
    : S extends undefined
    ? never
    : S extends ContainerInfoArgs | ContainerInfoFindManyArgs
    ?'include' extends U
    ? ContainerInfo  & {
    [P in TrueKeys<S['include']>]:
        P extends 'service' ? ServiceGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'service' ? ServiceGetPayload<S['select'][P]> | null :  P extends keyof ContainerInfo ? ContainerInfo[P] : never
  } 
    : ContainerInfo
  : ContainerInfo


  type ContainerInfoCountArgs = Merge<
    Omit<ContainerInfoFindManyArgs, 'select' | 'include'> & {
      select?: ContainerInfoCountAggregateInputType | true
    }
  >

  export interface ContainerInfoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ContainerInfo that matches the filter.
     * @param {ContainerInfoFindUniqueArgs} args - Arguments to find a ContainerInfo
     * @example
     * // Get one ContainerInfo
     * const containerInfo = await prisma.containerInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContainerInfoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContainerInfoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ContainerInfo'> extends True ? CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>> : CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo | null >, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T> | null >>

    /**
     * Find the first ContainerInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoFindFirstArgs} args - Arguments to find a ContainerInfo
     * @example
     * // Get one ContainerInfo
     * const containerInfo = await prisma.containerInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContainerInfoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContainerInfoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ContainerInfo'> extends True ? CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>> : CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo | null >, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T> | null >>

    /**
     * Find zero or more ContainerInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContainerInfos
     * const containerInfos = await prisma.containerInfo.findMany()
     * 
     * // Get first 10 ContainerInfos
     * const containerInfos = await prisma.containerInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const containerInfoWithIdOnly = await prisma.containerInfo.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ContainerInfoFindManyArgs>(
      args?: SelectSubset<T, ContainerInfoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ContainerInfo>>, PrismaPromise<Array<ContainerInfoGetPayload<T>>>>

    /**
     * Create a ContainerInfo.
     * @param {ContainerInfoCreateArgs} args - Arguments to create a ContainerInfo.
     * @example
     * // Create one ContainerInfo
     * const ContainerInfo = await prisma.containerInfo.create({
     *   data: {
     *     // ... data to create a ContainerInfo
     *   }
     * })
     * 
    **/
    create<T extends ContainerInfoCreateArgs>(
      args: SelectSubset<T, ContainerInfoCreateArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Create many ContainerInfos.
     *     @param {ContainerInfoCreateManyArgs} args - Arguments to create many ContainerInfos.
     *     @example
     *     // Create many ContainerInfos
     *     const containerInfo = await prisma.containerInfo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContainerInfoCreateManyArgs>(
      args?: SelectSubset<T, ContainerInfoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ContainerInfo.
     * @param {ContainerInfoDeleteArgs} args - Arguments to delete one ContainerInfo.
     * @example
     * // Delete one ContainerInfo
     * const ContainerInfo = await prisma.containerInfo.delete({
     *   where: {
     *     // ... filter to delete one ContainerInfo
     *   }
     * })
     * 
    **/
    delete<T extends ContainerInfoDeleteArgs>(
      args: SelectSubset<T, ContainerInfoDeleteArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Update one ContainerInfo.
     * @param {ContainerInfoUpdateArgs} args - Arguments to update one ContainerInfo.
     * @example
     * // Update one ContainerInfo
     * const containerInfo = await prisma.containerInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContainerInfoUpdateArgs>(
      args: SelectSubset<T, ContainerInfoUpdateArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Delete zero or more ContainerInfos.
     * @param {ContainerInfoDeleteManyArgs} args - Arguments to filter ContainerInfos to delete.
     * @example
     * // Delete a few ContainerInfos
     * const { count } = await prisma.containerInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContainerInfoDeleteManyArgs>(
      args?: SelectSubset<T, ContainerInfoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContainerInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContainerInfos
     * const containerInfo = await prisma.containerInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContainerInfoUpdateManyArgs>(
      args: SelectSubset<T, ContainerInfoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ContainerInfo.
     * @param {ContainerInfoUpsertArgs} args - Arguments to update or create a ContainerInfo.
     * @example
     * // Update or create a ContainerInfo
     * const containerInfo = await prisma.containerInfo.upsert({
     *   create: {
     *     // ... data to create a ContainerInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContainerInfo we want to update
     *   }
     * })
    **/
    upsert<T extends ContainerInfoUpsertArgs>(
      args: SelectSubset<T, ContainerInfoUpsertArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Find one ContainerInfo that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ContainerInfoFindUniqueOrThrowArgs} args - Arguments to find a ContainerInfo
     * @example
     * // Get one ContainerInfo
     * const containerInfo = await prisma.containerInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContainerInfoFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContainerInfoFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Find the first ContainerInfo that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoFindFirstOrThrowArgs} args - Arguments to find a ContainerInfo
     * @example
     * // Get one ContainerInfo
     * const containerInfo = await prisma.containerInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContainerInfoFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContainerInfoFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ContainerInfoClient<ContainerInfo>, Prisma__ContainerInfoClient<ContainerInfoGetPayload<T>>>

    /**
     * Count the number of ContainerInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoCountArgs} args - Arguments to filter ContainerInfos to count.
     * @example
     * // Count the number of ContainerInfos
     * const count = await prisma.containerInfo.count({
     *   where: {
     *     // ... the filter for the ContainerInfos we want to count
     *   }
     * })
    **/
    count<T extends ContainerInfoCountArgs>(
      args?: Subset<T, ContainerInfoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContainerInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContainerInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContainerInfoAggregateArgs>(args: Subset<T, ContainerInfoAggregateArgs>): PrismaPromise<GetContainerInfoAggregateType<T>>

    /**
     * Group by ContainerInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContainerInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContainerInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContainerInfoGroupByArgs['orderBy'] }
        : { orderBy?: ContainerInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContainerInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContainerInfoGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContainerInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContainerInfoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ContainerInfo base type for findUnique actions
   */
  export type ContainerInfoFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * Filter, which ContainerInfo to fetch.
     * 
    **/
    where: ContainerInfoWhereUniqueInput
  }

  /**
   * ContainerInfo: findUnique
   */
  export interface ContainerInfoFindUniqueArgs extends ContainerInfoFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ContainerInfo base type for findFirst actions
   */
  export type ContainerInfoFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * Filter, which ContainerInfo to fetch.
     * 
    **/
    where?: ContainerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContainerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<ContainerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContainerInfos.
     * 
    **/
    cursor?: ContainerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContainerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContainerInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContainerInfos.
     * 
    **/
    distinct?: Enumerable<ContainerInfoScalarFieldEnum>
  }

  /**
   * ContainerInfo: findFirst
   */
  export interface ContainerInfoFindFirstArgs extends ContainerInfoFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ContainerInfo findMany
   */
  export type ContainerInfoFindManyArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * Filter, which ContainerInfos to fetch.
     * 
    **/
    where?: ContainerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContainerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<ContainerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContainerInfos.
     * 
    **/
    cursor?: ContainerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContainerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContainerInfos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContainerInfoScalarFieldEnum>
  }


  /**
   * ContainerInfo create
   */
  export type ContainerInfoCreateArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * The data needed to create a ContainerInfo.
     * 
    **/
    data: XOR<ContainerInfoCreateInput, ContainerInfoUncheckedCreateInput>
  }


  /**
   * ContainerInfo createMany
   */
  export type ContainerInfoCreateManyArgs = {
    /**
     * The data used to create many ContainerInfos.
     * 
    **/
    data: Enumerable<ContainerInfoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ContainerInfo update
   */
  export type ContainerInfoUpdateArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * The data needed to update a ContainerInfo.
     * 
    **/
    data: XOR<ContainerInfoUpdateInput, ContainerInfoUncheckedUpdateInput>
    /**
     * Choose, which ContainerInfo to update.
     * 
    **/
    where: ContainerInfoWhereUniqueInput
  }


  /**
   * ContainerInfo updateMany
   */
  export type ContainerInfoUpdateManyArgs = {
    /**
     * The data used to update ContainerInfos.
     * 
    **/
    data: XOR<ContainerInfoUpdateManyMutationInput, ContainerInfoUncheckedUpdateManyInput>
    /**
     * Filter which ContainerInfos to update
     * 
    **/
    where?: ContainerInfoWhereInput
  }


  /**
   * ContainerInfo upsert
   */
  export type ContainerInfoUpsertArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * The filter to search for the ContainerInfo to update in case it exists.
     * 
    **/
    where: ContainerInfoWhereUniqueInput
    /**
     * In case the ContainerInfo found by the `where` argument doesn't exist, create a new ContainerInfo with this data.
     * 
    **/
    create: XOR<ContainerInfoCreateInput, ContainerInfoUncheckedCreateInput>
    /**
     * In case the ContainerInfo was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContainerInfoUpdateInput, ContainerInfoUncheckedUpdateInput>
  }


  /**
   * ContainerInfo delete
   */
  export type ContainerInfoDeleteArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
    /**
     * Filter which ContainerInfo to delete.
     * 
    **/
    where: ContainerInfoWhereUniqueInput
  }


  /**
   * ContainerInfo deleteMany
   */
  export type ContainerInfoDeleteManyArgs = {
    /**
     * Filter which ContainerInfos to delete
     * 
    **/
    where?: ContainerInfoWhereInput
  }


  /**
   * ContainerInfo: findUniqueOrThrow
   */
  export type ContainerInfoFindUniqueOrThrowArgs = ContainerInfoFindUniqueArgsBase
      

  /**
   * ContainerInfo: findFirstOrThrow
   */
  export type ContainerInfoFindFirstOrThrowArgs = ContainerInfoFindFirstArgsBase
      

  /**
   * ContainerInfo without action
   */
  export type ContainerInfoArgs = {
    /**
     * Select specific fields to fetch from the ContainerInfo
     * 
    **/
    select?: ContainerInfoSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContainerInfoInclude | null
  }



  /**
   * Model EnvironmentVariable
   */


  export type AggregateEnvironmentVariable = {
    _count: EnvironmentVariableCountAggregateOutputType | null
    _avg: EnvironmentVariableAvgAggregateOutputType | null
    _sum: EnvironmentVariableSumAggregateOutputType | null
    _min: EnvironmentVariableMinAggregateOutputType | null
    _max: EnvironmentVariableMaxAggregateOutputType | null
  }

  export type EnvironmentVariableAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type EnvironmentVariableSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type EnvironmentVariableMinAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    serviceId: number | null
  }

  export type EnvironmentVariableMaxAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    serviceId: number | null
  }

  export type EnvironmentVariableCountAggregateOutputType = {
    id: number
    key: number
    value: number
    serviceId: number
    _all: number
  }


  export type EnvironmentVariableAvgAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type EnvironmentVariableSumAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type EnvironmentVariableMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    serviceId?: true
  }

  export type EnvironmentVariableMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    serviceId?: true
  }

  export type EnvironmentVariableCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    serviceId?: true
    _all?: true
  }

  export type EnvironmentVariableAggregateArgs = {
    /**
     * Filter which EnvironmentVariable to aggregate.
     * 
    **/
    where?: EnvironmentVariableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnvironmentVariables to fetch.
     * 
    **/
    orderBy?: Enumerable<EnvironmentVariableOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EnvironmentVariableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnvironmentVariables from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnvironmentVariables.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnvironmentVariables
    **/
    _count?: true | EnvironmentVariableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnvironmentVariableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnvironmentVariableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnvironmentVariableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnvironmentVariableMaxAggregateInputType
  }

  export type GetEnvironmentVariableAggregateType<T extends EnvironmentVariableAggregateArgs> = {
        [P in keyof T & keyof AggregateEnvironmentVariable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnvironmentVariable[P]>
      : GetScalarType<T[P], AggregateEnvironmentVariable[P]>
  }




  export type EnvironmentVariableGroupByArgs = {
    where?: EnvironmentVariableWhereInput
    orderBy?: Enumerable<EnvironmentVariableOrderByWithAggregationInput>
    by: Array<EnvironmentVariableScalarFieldEnum>
    having?: EnvironmentVariableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnvironmentVariableCountAggregateInputType | true
    _avg?: EnvironmentVariableAvgAggregateInputType
    _sum?: EnvironmentVariableSumAggregateInputType
    _min?: EnvironmentVariableMinAggregateInputType
    _max?: EnvironmentVariableMaxAggregateInputType
  }


  export type EnvironmentVariableGroupByOutputType = {
    id: number
    key: string
    value: string
    serviceId: number
    _count: EnvironmentVariableCountAggregateOutputType | null
    _avg: EnvironmentVariableAvgAggregateOutputType | null
    _sum: EnvironmentVariableSumAggregateOutputType | null
    _min: EnvironmentVariableMinAggregateOutputType | null
    _max: EnvironmentVariableMaxAggregateOutputType | null
  }

  type GetEnvironmentVariableGroupByPayload<T extends EnvironmentVariableGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EnvironmentVariableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnvironmentVariableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnvironmentVariableGroupByOutputType[P]>
            : GetScalarType<T[P], EnvironmentVariableGroupByOutputType[P]>
        }
      >
    >


  export type EnvironmentVariableSelect = {
    id?: boolean
    key?: boolean
    value?: boolean
    service?: boolean | ServiceArgs
    serviceId?: boolean
  }

  export type EnvironmentVariableInclude = {
    service?: boolean | ServiceArgs
  }

  export type EnvironmentVariableGetPayload<
    S extends boolean | null | undefined | EnvironmentVariableArgs,
    U = keyof S
      > = S extends true
        ? EnvironmentVariable
    : S extends undefined
    ? never
    : S extends EnvironmentVariableArgs | EnvironmentVariableFindManyArgs
    ?'include' extends U
    ? EnvironmentVariable  & {
    [P in TrueKeys<S['include']>]:
        P extends 'service' ? ServiceGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'service' ? ServiceGetPayload<S['select'][P]> :  P extends keyof EnvironmentVariable ? EnvironmentVariable[P] : never
  } 
    : EnvironmentVariable
  : EnvironmentVariable


  type EnvironmentVariableCountArgs = Merge<
    Omit<EnvironmentVariableFindManyArgs, 'select' | 'include'> & {
      select?: EnvironmentVariableCountAggregateInputType | true
    }
  >

  export interface EnvironmentVariableDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EnvironmentVariable that matches the filter.
     * @param {EnvironmentVariableFindUniqueArgs} args - Arguments to find a EnvironmentVariable
     * @example
     * // Get one EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EnvironmentVariableFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EnvironmentVariableFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EnvironmentVariable'> extends True ? CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>> : CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable | null >, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T> | null >>

    /**
     * Find the first EnvironmentVariable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableFindFirstArgs} args - Arguments to find a EnvironmentVariable
     * @example
     * // Get one EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EnvironmentVariableFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EnvironmentVariableFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EnvironmentVariable'> extends True ? CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>> : CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable | null >, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T> | null >>

    /**
     * Find zero or more EnvironmentVariables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnvironmentVariables
     * const environmentVariables = await prisma.environmentVariable.findMany()
     * 
     * // Get first 10 EnvironmentVariables
     * const environmentVariables = await prisma.environmentVariable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const environmentVariableWithIdOnly = await prisma.environmentVariable.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EnvironmentVariableFindManyArgs>(
      args?: SelectSubset<T, EnvironmentVariableFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EnvironmentVariable>>, PrismaPromise<Array<EnvironmentVariableGetPayload<T>>>>

    /**
     * Create a EnvironmentVariable.
     * @param {EnvironmentVariableCreateArgs} args - Arguments to create a EnvironmentVariable.
     * @example
     * // Create one EnvironmentVariable
     * const EnvironmentVariable = await prisma.environmentVariable.create({
     *   data: {
     *     // ... data to create a EnvironmentVariable
     *   }
     * })
     * 
    **/
    create<T extends EnvironmentVariableCreateArgs>(
      args: SelectSubset<T, EnvironmentVariableCreateArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Create many EnvironmentVariables.
     *     @param {EnvironmentVariableCreateManyArgs} args - Arguments to create many EnvironmentVariables.
     *     @example
     *     // Create many EnvironmentVariables
     *     const environmentVariable = await prisma.environmentVariable.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EnvironmentVariableCreateManyArgs>(
      args?: SelectSubset<T, EnvironmentVariableCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EnvironmentVariable.
     * @param {EnvironmentVariableDeleteArgs} args - Arguments to delete one EnvironmentVariable.
     * @example
     * // Delete one EnvironmentVariable
     * const EnvironmentVariable = await prisma.environmentVariable.delete({
     *   where: {
     *     // ... filter to delete one EnvironmentVariable
     *   }
     * })
     * 
    **/
    delete<T extends EnvironmentVariableDeleteArgs>(
      args: SelectSubset<T, EnvironmentVariableDeleteArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Update one EnvironmentVariable.
     * @param {EnvironmentVariableUpdateArgs} args - Arguments to update one EnvironmentVariable.
     * @example
     * // Update one EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EnvironmentVariableUpdateArgs>(
      args: SelectSubset<T, EnvironmentVariableUpdateArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Delete zero or more EnvironmentVariables.
     * @param {EnvironmentVariableDeleteManyArgs} args - Arguments to filter EnvironmentVariables to delete.
     * @example
     * // Delete a few EnvironmentVariables
     * const { count } = await prisma.environmentVariable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EnvironmentVariableDeleteManyArgs>(
      args?: SelectSubset<T, EnvironmentVariableDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnvironmentVariables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnvironmentVariables
     * const environmentVariable = await prisma.environmentVariable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EnvironmentVariableUpdateManyArgs>(
      args: SelectSubset<T, EnvironmentVariableUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EnvironmentVariable.
     * @param {EnvironmentVariableUpsertArgs} args - Arguments to update or create a EnvironmentVariable.
     * @example
     * // Update or create a EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.upsert({
     *   create: {
     *     // ... data to create a EnvironmentVariable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnvironmentVariable we want to update
     *   }
     * })
    **/
    upsert<T extends EnvironmentVariableUpsertArgs>(
      args: SelectSubset<T, EnvironmentVariableUpsertArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Find one EnvironmentVariable that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EnvironmentVariableFindUniqueOrThrowArgs} args - Arguments to find a EnvironmentVariable
     * @example
     * // Get one EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EnvironmentVariableFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EnvironmentVariableFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Find the first EnvironmentVariable that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableFindFirstOrThrowArgs} args - Arguments to find a EnvironmentVariable
     * @example
     * // Get one EnvironmentVariable
     * const environmentVariable = await prisma.environmentVariable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EnvironmentVariableFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EnvironmentVariableFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__EnvironmentVariableClient<EnvironmentVariable>, Prisma__EnvironmentVariableClient<EnvironmentVariableGetPayload<T>>>

    /**
     * Count the number of EnvironmentVariables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableCountArgs} args - Arguments to filter EnvironmentVariables to count.
     * @example
     * // Count the number of EnvironmentVariables
     * const count = await prisma.environmentVariable.count({
     *   where: {
     *     // ... the filter for the EnvironmentVariables we want to count
     *   }
     * })
    **/
    count<T extends EnvironmentVariableCountArgs>(
      args?: Subset<T, EnvironmentVariableCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnvironmentVariableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnvironmentVariable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnvironmentVariableAggregateArgs>(args: Subset<T, EnvironmentVariableAggregateArgs>): PrismaPromise<GetEnvironmentVariableAggregateType<T>>

    /**
     * Group by EnvironmentVariable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnvironmentVariableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnvironmentVariableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnvironmentVariableGroupByArgs['orderBy'] }
        : { orderBy?: EnvironmentVariableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnvironmentVariableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnvironmentVariableGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnvironmentVariable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EnvironmentVariableClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EnvironmentVariable base type for findUnique actions
   */
  export type EnvironmentVariableFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * Filter, which EnvironmentVariable to fetch.
     * 
    **/
    where: EnvironmentVariableWhereUniqueInput
  }

  /**
   * EnvironmentVariable: findUnique
   */
  export interface EnvironmentVariableFindUniqueArgs extends EnvironmentVariableFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EnvironmentVariable base type for findFirst actions
   */
  export type EnvironmentVariableFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * Filter, which EnvironmentVariable to fetch.
     * 
    **/
    where?: EnvironmentVariableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnvironmentVariables to fetch.
     * 
    **/
    orderBy?: Enumerable<EnvironmentVariableOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnvironmentVariables.
     * 
    **/
    cursor?: EnvironmentVariableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnvironmentVariables from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnvironmentVariables.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnvironmentVariables.
     * 
    **/
    distinct?: Enumerable<EnvironmentVariableScalarFieldEnum>
  }

  /**
   * EnvironmentVariable: findFirst
   */
  export interface EnvironmentVariableFindFirstArgs extends EnvironmentVariableFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EnvironmentVariable findMany
   */
  export type EnvironmentVariableFindManyArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * Filter, which EnvironmentVariables to fetch.
     * 
    **/
    where?: EnvironmentVariableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnvironmentVariables to fetch.
     * 
    **/
    orderBy?: Enumerable<EnvironmentVariableOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnvironmentVariables.
     * 
    **/
    cursor?: EnvironmentVariableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnvironmentVariables from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnvironmentVariables.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EnvironmentVariableScalarFieldEnum>
  }


  /**
   * EnvironmentVariable create
   */
  export type EnvironmentVariableCreateArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * The data needed to create a EnvironmentVariable.
     * 
    **/
    data: XOR<EnvironmentVariableCreateInput, EnvironmentVariableUncheckedCreateInput>
  }


  /**
   * EnvironmentVariable createMany
   */
  export type EnvironmentVariableCreateManyArgs = {
    /**
     * The data used to create many EnvironmentVariables.
     * 
    **/
    data: Enumerable<EnvironmentVariableCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EnvironmentVariable update
   */
  export type EnvironmentVariableUpdateArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * The data needed to update a EnvironmentVariable.
     * 
    **/
    data: XOR<EnvironmentVariableUpdateInput, EnvironmentVariableUncheckedUpdateInput>
    /**
     * Choose, which EnvironmentVariable to update.
     * 
    **/
    where: EnvironmentVariableWhereUniqueInput
  }


  /**
   * EnvironmentVariable updateMany
   */
  export type EnvironmentVariableUpdateManyArgs = {
    /**
     * The data used to update EnvironmentVariables.
     * 
    **/
    data: XOR<EnvironmentVariableUpdateManyMutationInput, EnvironmentVariableUncheckedUpdateManyInput>
    /**
     * Filter which EnvironmentVariables to update
     * 
    **/
    where?: EnvironmentVariableWhereInput
  }


  /**
   * EnvironmentVariable upsert
   */
  export type EnvironmentVariableUpsertArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * The filter to search for the EnvironmentVariable to update in case it exists.
     * 
    **/
    where: EnvironmentVariableWhereUniqueInput
    /**
     * In case the EnvironmentVariable found by the `where` argument doesn't exist, create a new EnvironmentVariable with this data.
     * 
    **/
    create: XOR<EnvironmentVariableCreateInput, EnvironmentVariableUncheckedCreateInput>
    /**
     * In case the EnvironmentVariable was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EnvironmentVariableUpdateInput, EnvironmentVariableUncheckedUpdateInput>
  }


  /**
   * EnvironmentVariable delete
   */
  export type EnvironmentVariableDeleteArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
    /**
     * Filter which EnvironmentVariable to delete.
     * 
    **/
    where: EnvironmentVariableWhereUniqueInput
  }


  /**
   * EnvironmentVariable deleteMany
   */
  export type EnvironmentVariableDeleteManyArgs = {
    /**
     * Filter which EnvironmentVariables to delete
     * 
    **/
    where?: EnvironmentVariableWhereInput
  }


  /**
   * EnvironmentVariable: findUniqueOrThrow
   */
  export type EnvironmentVariableFindUniqueOrThrowArgs = EnvironmentVariableFindUniqueArgsBase
      

  /**
   * EnvironmentVariable: findFirstOrThrow
   */
  export type EnvironmentVariableFindFirstOrThrowArgs = EnvironmentVariableFindFirstArgsBase
      

  /**
   * EnvironmentVariable without action
   */
  export type EnvironmentVariableArgs = {
    /**
     * Select specific fields to fetch from the EnvironmentVariable
     * 
    **/
    select?: EnvironmentVariableSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EnvironmentVariableInclude | null
  }



  /**
   * Model Redirect
   */


  export type AggregateRedirect = {
    _count: RedirectCountAggregateOutputType | null
    _avg: RedirectAvgAggregateOutputType | null
    _sum: RedirectSumAggregateOutputType | null
    _min: RedirectMinAggregateOutputType | null
    _max: RedirectMaxAggregateOutputType | null
  }

  export type RedirectAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type RedirectSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
  }

  export type RedirectMinAggregateOutputType = {
    id: number | null
    from: string | null
    to: string | null
    serviceId: number | null
  }

  export type RedirectMaxAggregateOutputType = {
    id: number | null
    from: string | null
    to: string | null
    serviceId: number | null
  }

  export type RedirectCountAggregateOutputType = {
    id: number
    from: number
    to: number
    serviceId: number
    _all: number
  }


  export type RedirectAvgAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type RedirectSumAggregateInputType = {
    id?: true
    serviceId?: true
  }

  export type RedirectMinAggregateInputType = {
    id?: true
    from?: true
    to?: true
    serviceId?: true
  }

  export type RedirectMaxAggregateInputType = {
    id?: true
    from?: true
    to?: true
    serviceId?: true
  }

  export type RedirectCountAggregateInputType = {
    id?: true
    from?: true
    to?: true
    serviceId?: true
    _all?: true
  }

  export type RedirectAggregateArgs = {
    /**
     * Filter which Redirect to aggregate.
     * 
    **/
    where?: RedirectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redirects to fetch.
     * 
    **/
    orderBy?: Enumerable<RedirectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RedirectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redirects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redirects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Redirects
    **/
    _count?: true | RedirectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RedirectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RedirectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedirectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedirectMaxAggregateInputType
  }

  export type GetRedirectAggregateType<T extends RedirectAggregateArgs> = {
        [P in keyof T & keyof AggregateRedirect]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedirect[P]>
      : GetScalarType<T[P], AggregateRedirect[P]>
  }




  export type RedirectGroupByArgs = {
    where?: RedirectWhereInput
    orderBy?: Enumerable<RedirectOrderByWithAggregationInput>
    by: Array<RedirectScalarFieldEnum>
    having?: RedirectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedirectCountAggregateInputType | true
    _avg?: RedirectAvgAggregateInputType
    _sum?: RedirectSumAggregateInputType
    _min?: RedirectMinAggregateInputType
    _max?: RedirectMaxAggregateInputType
  }


  export type RedirectGroupByOutputType = {
    id: number
    from: string
    to: string
    serviceId: number
    _count: RedirectCountAggregateOutputType | null
    _avg: RedirectAvgAggregateOutputType | null
    _sum: RedirectSumAggregateOutputType | null
    _min: RedirectMinAggregateOutputType | null
    _max: RedirectMaxAggregateOutputType | null
  }

  type GetRedirectGroupByPayload<T extends RedirectGroupByArgs> = PrismaPromise<
    Array<
      PickArray<RedirectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RedirectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RedirectGroupByOutputType[P]>
            : GetScalarType<T[P], RedirectGroupByOutputType[P]>
        }
      >
    >


  export type RedirectSelect = {
    id?: boolean
    from?: boolean
    to?: boolean
    service?: boolean | ServiceArgs
    serviceId?: boolean
  }

  export type RedirectInclude = {
    service?: boolean | ServiceArgs
  }

  export type RedirectGetPayload<
    S extends boolean | null | undefined | RedirectArgs,
    U = keyof S
      > = S extends true
        ? Redirect
    : S extends undefined
    ? never
    : S extends RedirectArgs | RedirectFindManyArgs
    ?'include' extends U
    ? Redirect  & {
    [P in TrueKeys<S['include']>]:
        P extends 'service' ? ServiceGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'service' ? ServiceGetPayload<S['select'][P]> :  P extends keyof Redirect ? Redirect[P] : never
  } 
    : Redirect
  : Redirect


  type RedirectCountArgs = Merge<
    Omit<RedirectFindManyArgs, 'select' | 'include'> & {
      select?: RedirectCountAggregateInputType | true
    }
  >

  export interface RedirectDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Redirect that matches the filter.
     * @param {RedirectFindUniqueArgs} args - Arguments to find a Redirect
     * @example
     * // Get one Redirect
     * const redirect = await prisma.redirect.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RedirectFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RedirectFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Redirect'> extends True ? CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>> : CheckSelect<T, Prisma__RedirectClient<Redirect | null >, Prisma__RedirectClient<RedirectGetPayload<T> | null >>

    /**
     * Find the first Redirect that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectFindFirstArgs} args - Arguments to find a Redirect
     * @example
     * // Get one Redirect
     * const redirect = await prisma.redirect.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RedirectFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RedirectFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Redirect'> extends True ? CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>> : CheckSelect<T, Prisma__RedirectClient<Redirect | null >, Prisma__RedirectClient<RedirectGetPayload<T> | null >>

    /**
     * Find zero or more Redirects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Redirects
     * const redirects = await prisma.redirect.findMany()
     * 
     * // Get first 10 Redirects
     * const redirects = await prisma.redirect.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redirectWithIdOnly = await prisma.redirect.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RedirectFindManyArgs>(
      args?: SelectSubset<T, RedirectFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Redirect>>, PrismaPromise<Array<RedirectGetPayload<T>>>>

    /**
     * Create a Redirect.
     * @param {RedirectCreateArgs} args - Arguments to create a Redirect.
     * @example
     * // Create one Redirect
     * const Redirect = await prisma.redirect.create({
     *   data: {
     *     // ... data to create a Redirect
     *   }
     * })
     * 
    **/
    create<T extends RedirectCreateArgs>(
      args: SelectSubset<T, RedirectCreateArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Create many Redirects.
     *     @param {RedirectCreateManyArgs} args - Arguments to create many Redirects.
     *     @example
     *     // Create many Redirects
     *     const redirect = await prisma.redirect.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RedirectCreateManyArgs>(
      args?: SelectSubset<T, RedirectCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Redirect.
     * @param {RedirectDeleteArgs} args - Arguments to delete one Redirect.
     * @example
     * // Delete one Redirect
     * const Redirect = await prisma.redirect.delete({
     *   where: {
     *     // ... filter to delete one Redirect
     *   }
     * })
     * 
    **/
    delete<T extends RedirectDeleteArgs>(
      args: SelectSubset<T, RedirectDeleteArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Update one Redirect.
     * @param {RedirectUpdateArgs} args - Arguments to update one Redirect.
     * @example
     * // Update one Redirect
     * const redirect = await prisma.redirect.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RedirectUpdateArgs>(
      args: SelectSubset<T, RedirectUpdateArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Delete zero or more Redirects.
     * @param {RedirectDeleteManyArgs} args - Arguments to filter Redirects to delete.
     * @example
     * // Delete a few Redirects
     * const { count } = await prisma.redirect.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RedirectDeleteManyArgs>(
      args?: SelectSubset<T, RedirectDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Redirects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Redirects
     * const redirect = await prisma.redirect.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RedirectUpdateManyArgs>(
      args: SelectSubset<T, RedirectUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Redirect.
     * @param {RedirectUpsertArgs} args - Arguments to update or create a Redirect.
     * @example
     * // Update or create a Redirect
     * const redirect = await prisma.redirect.upsert({
     *   create: {
     *     // ... data to create a Redirect
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Redirect we want to update
     *   }
     * })
    **/
    upsert<T extends RedirectUpsertArgs>(
      args: SelectSubset<T, RedirectUpsertArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Find one Redirect that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {RedirectFindUniqueOrThrowArgs} args - Arguments to find a Redirect
     * @example
     * // Get one Redirect
     * const redirect = await prisma.redirect.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RedirectFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, RedirectFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Find the first Redirect that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectFindFirstOrThrowArgs} args - Arguments to find a Redirect
     * @example
     * // Get one Redirect
     * const redirect = await prisma.redirect.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RedirectFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RedirectFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__RedirectClient<Redirect>, Prisma__RedirectClient<RedirectGetPayload<T>>>

    /**
     * Count the number of Redirects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectCountArgs} args - Arguments to filter Redirects to count.
     * @example
     * // Count the number of Redirects
     * const count = await prisma.redirect.count({
     *   where: {
     *     // ... the filter for the Redirects we want to count
     *   }
     * })
    **/
    count<T extends RedirectCountArgs>(
      args?: Subset<T, RedirectCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedirectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Redirect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RedirectAggregateArgs>(args: Subset<T, RedirectAggregateArgs>): PrismaPromise<GetRedirectAggregateType<T>>

    /**
     * Group by Redirect.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RedirectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedirectGroupByArgs['orderBy'] }
        : { orderBy?: RedirectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RedirectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedirectGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Redirect.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RedirectClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, Prisma__ServiceClient<Service | null >, Prisma__ServiceClient<ServiceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Redirect base type for findUnique actions
   */
  export type RedirectFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * Filter, which Redirect to fetch.
     * 
    **/
    where: RedirectWhereUniqueInput
  }

  /**
   * Redirect: findUnique
   */
  export interface RedirectFindUniqueArgs extends RedirectFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Redirect base type for findFirst actions
   */
  export type RedirectFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * Filter, which Redirect to fetch.
     * 
    **/
    where?: RedirectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redirects to fetch.
     * 
    **/
    orderBy?: Enumerable<RedirectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Redirects.
     * 
    **/
    cursor?: RedirectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redirects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redirects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Redirects.
     * 
    **/
    distinct?: Enumerable<RedirectScalarFieldEnum>
  }

  /**
   * Redirect: findFirst
   */
  export interface RedirectFindFirstArgs extends RedirectFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Redirect findMany
   */
  export type RedirectFindManyArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * Filter, which Redirects to fetch.
     * 
    **/
    where?: RedirectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Redirects to fetch.
     * 
    **/
    orderBy?: Enumerable<RedirectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Redirects.
     * 
    **/
    cursor?: RedirectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Redirects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Redirects.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RedirectScalarFieldEnum>
  }


  /**
   * Redirect create
   */
  export type RedirectCreateArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * The data needed to create a Redirect.
     * 
    **/
    data: XOR<RedirectCreateInput, RedirectUncheckedCreateInput>
  }


  /**
   * Redirect createMany
   */
  export type RedirectCreateManyArgs = {
    /**
     * The data used to create many Redirects.
     * 
    **/
    data: Enumerable<RedirectCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Redirect update
   */
  export type RedirectUpdateArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * The data needed to update a Redirect.
     * 
    **/
    data: XOR<RedirectUpdateInput, RedirectUncheckedUpdateInput>
    /**
     * Choose, which Redirect to update.
     * 
    **/
    where: RedirectWhereUniqueInput
  }


  /**
   * Redirect updateMany
   */
  export type RedirectUpdateManyArgs = {
    /**
     * The data used to update Redirects.
     * 
    **/
    data: XOR<RedirectUpdateManyMutationInput, RedirectUncheckedUpdateManyInput>
    /**
     * Filter which Redirects to update
     * 
    **/
    where?: RedirectWhereInput
  }


  /**
   * Redirect upsert
   */
  export type RedirectUpsertArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * The filter to search for the Redirect to update in case it exists.
     * 
    **/
    where: RedirectWhereUniqueInput
    /**
     * In case the Redirect found by the `where` argument doesn't exist, create a new Redirect with this data.
     * 
    **/
    create: XOR<RedirectCreateInput, RedirectUncheckedCreateInput>
    /**
     * In case the Redirect was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RedirectUpdateInput, RedirectUncheckedUpdateInput>
  }


  /**
   * Redirect delete
   */
  export type RedirectDeleteArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
    /**
     * Filter which Redirect to delete.
     * 
    **/
    where: RedirectWhereUniqueInput
  }


  /**
   * Redirect deleteMany
   */
  export type RedirectDeleteManyArgs = {
    /**
     * Filter which Redirects to delete
     * 
    **/
    where?: RedirectWhereInput
  }


  /**
   * Redirect: findUniqueOrThrow
   */
  export type RedirectFindUniqueOrThrowArgs = RedirectFindUniqueArgsBase
      

  /**
   * Redirect: findFirstOrThrow
   */
  export type RedirectFindFirstOrThrowArgs = RedirectFindFirstArgsBase
      

  /**
   * Redirect without action
   */
  export type RedirectArgs = {
    /**
     * Select specific fields to fetch from the Redirect
     * 
    **/
    select?: RedirectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RedirectInclude | null
  }



  /**
   * Model Project
   */


  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs = {
    /**
     * Filter which Project to aggregate.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs = {
    where?: ProjectWhereInput
    orderBy?: Enumerable<ProjectOrderByWithAggregationInput>
    by: Array<ProjectScalarFieldEnum>
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }


  export type ProjectGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect = {
    id?: boolean
    name?: boolean
    services?: boolean | ServiceFindManyArgs
    createdAt?: boolean
    _count?: boolean | ProjectCountOutputTypeArgs
  }

  export type ProjectInclude = {
    services?: boolean | ServiceFindManyArgs
    _count?: boolean | ProjectCountOutputTypeArgs
  }

  export type ProjectGetPayload<
    S extends boolean | null | undefined | ProjectArgs,
    U = keyof S
      > = S extends true
        ? Project
    : S extends undefined
    ? never
    : S extends ProjectArgs | ProjectFindManyArgs
    ?'include' extends U
    ? Project  & {
    [P in TrueKeys<S['include']>]:
        P extends 'services' ? Array < ServiceGetPayload<S['include'][P]>>  :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'services' ? Array < ServiceGetPayload<S['select'][P]>>  :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Project ? Project[P] : never
  } 
    : Project
  : Project


  type ProjectCountArgs = Merge<
    Omit<ProjectFindManyArgs, 'select' | 'include'> & {
      select?: ProjectCountAggregateInputType | true
    }
  >

  export interface ProjectDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProjectFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProjectFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Project'> extends True ? CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>> : CheckSelect<T, Prisma__ProjectClient<Project | null >, Prisma__ProjectClient<ProjectGetPayload<T> | null >>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProjectFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProjectFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Project'> extends True ? CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>> : CheckSelect<T, Prisma__ProjectClient<Project | null >, Prisma__ProjectClient<ProjectGetPayload<T> | null >>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProjectFindManyArgs>(
      args?: SelectSubset<T, ProjectFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Project>>, PrismaPromise<Array<ProjectGetPayload<T>>>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
    **/
    create<T extends ProjectCreateArgs>(
      args: SelectSubset<T, ProjectCreateArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Create many Projects.
     *     @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     *     @example
     *     // Create many Projects
     *     const project = await prisma.project.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProjectCreateManyArgs>(
      args?: SelectSubset<T, ProjectCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
    **/
    delete<T extends ProjectDeleteArgs>(
      args: SelectSubset<T, ProjectDeleteArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProjectUpdateArgs>(
      args: SelectSubset<T, ProjectUpdateArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProjectDeleteManyArgs>(
      args?: SelectSubset<T, ProjectDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProjectUpdateManyArgs>(
      args: SelectSubset<T, ProjectUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
    **/
    upsert<T extends ProjectUpsertArgs>(
      args: SelectSubset<T, ProjectUpsertArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Find one Project that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProjectFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Find the first Project that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProjectFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProjectClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Project base type for findUnique actions
   */
  export type ProjectFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     * 
    **/
    where: ProjectWhereUniqueInput
  }

  /**
   * Project: findUnique
   */
  export interface ProjectFindUniqueArgs extends ProjectFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project base type for findFirst actions
   */
  export type ProjectFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     * 
    **/
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }

  /**
   * Project: findFirst
   */
  export interface ProjectFindFirstArgs extends ProjectFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }


  /**
   * Project create
   */
  export type ProjectCreateArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The data needed to create a Project.
     * 
    **/
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }


  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs = {
    /**
     * The data used to create many Projects.
     * 
    **/
    data: Enumerable<ProjectCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Project update
   */
  export type ProjectUpdateArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The data needed to update a Project.
     * 
    **/
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     * 
    **/
    where: ProjectWhereUniqueInput
  }


  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs = {
    /**
     * The data used to update Projects.
     * 
    **/
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     * 
    **/
    where?: ProjectWhereInput
  }


  /**
   * Project upsert
   */
  export type ProjectUpsertArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The filter to search for the Project to update in case it exists.
     * 
    **/
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     * 
    **/
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }


  /**
   * Project delete
   */
  export type ProjectDeleteArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter which Project to delete.
     * 
    **/
    where: ProjectWhereUniqueInput
  }


  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs = {
    /**
     * Filter which Projects to delete
     * 
    **/
    where?: ProjectWhereInput
  }


  /**
   * Project: findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs = ProjectFindUniqueArgsBase
      

  /**
   * Project: findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs = ProjectFindFirstArgsBase
      

  /**
   * Project without action
   */
  export type ProjectArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    hash: 'hash',
    salt: 'salt',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    hosts: 'hosts',
    imageId: 'imageId',
    containerInfoId: 'containerInfoId',
    projectId: 'projectId',
    order: 'order',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tag: 'tag',
    repository: 'repository',
    createdAt: 'createdAt'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const ContainerInfoScalarFieldEnum: {
    id: 'id',
    name: 'name',
    network: 'network',
    containerId: 'containerId'
  };

  export type ContainerInfoScalarFieldEnum = (typeof ContainerInfoScalarFieldEnum)[keyof typeof ContainerInfoScalarFieldEnum]


  export const EnvironmentVariableScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    serviceId: 'serviceId'
  };

  export type EnvironmentVariableScalarFieldEnum = (typeof EnvironmentVariableScalarFieldEnum)[keyof typeof EnvironmentVariableScalarFieldEnum]


  export const RedirectScalarFieldEnum: {
    id: 'id',
    from: 'from',
    to: 'to',
    serviceId: 'serviceId'
  };

  export type RedirectScalarFieldEnum = (typeof RedirectScalarFieldEnum)[keyof typeof RedirectScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    username?: StringFilter | string
    hash?: StringFilter | string
    salt?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    Service?: ServiceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    createdAt?: SortOrder
    Service?: ServiceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    username?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    username?: StringWithAggregatesFilter | string
    hash?: StringWithAggregatesFilter | string
    salt?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ServiceWhereInput = {
    AND?: Enumerable<ServiceWhereInput>
    OR?: Enumerable<ServiceWhereInput>
    NOT?: Enumerable<ServiceWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    status?: EnumServiceStatusFilter | ServiceStatus
    hosts?: StringNullableListFilter
    image?: XOR<ImageRelationFilter, ImageWhereInput>
    imageId?: IntFilter | number
    environmentVariables?: EnvironmentVariableListRelationFilter
    redirects?: RedirectListRelationFilter
    containerInfo?: XOR<ContainerInfoRelationFilter, ContainerInfoWhereInput> | null
    containerInfoId?: IntNullableFilter | number | null
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
    projectId?: IntFilter | number
    order?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    hosts?: SortOrder
    image?: ImageOrderByWithRelationInput
    imageId?: SortOrder
    environmentVariables?: EnvironmentVariableOrderByRelationAggregateInput
    redirects?: RedirectOrderByRelationAggregateInput
    containerInfo?: ContainerInfoOrderByWithRelationInput
    containerInfoId?: SortOrder
    project?: ProjectOrderByWithRelationInput
    projectId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  export type ServiceWhereUniqueInput = {
    id?: number
    name?: string
    containerInfoId?: number
  }

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    hosts?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    status?: EnumServiceStatusWithAggregatesFilter | ServiceStatus
    hosts?: StringNullableListFilter
    imageId?: IntWithAggregatesFilter | number
    containerInfoId?: IntNullableWithAggregatesFilter | number | null
    projectId?: IntWithAggregatesFilter | number
    order?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
  }

  export type ImageWhereInput = {
    AND?: Enumerable<ImageWhereInput>
    OR?: Enumerable<ImageWhereInput>
    NOT?: Enumerable<ImageWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    tag?: StringFilter | string
    repository?: StringFilter | string
    services?: ServiceListRelationFilter
    createdAt?: DateTimeFilter | Date | string
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    repository?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    createdAt?: SortOrder
  }

  export type ImageWhereUniqueInput = {
    id?: number
    imageIdentifier?: ImageImageIdentifierCompoundUniqueInput
  }

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    repository?: SortOrder
    createdAt?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _avg?: ImageAvgOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
    _sum?: ImageSumOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ImageScalarWhereWithAggregatesInput>
    OR?: Enumerable<ImageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ImageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    tag?: StringWithAggregatesFilter | string
    repository?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ContainerInfoWhereInput = {
    AND?: Enumerable<ContainerInfoWhereInput>
    OR?: Enumerable<ContainerInfoWhereInput>
    NOT?: Enumerable<ContainerInfoWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    network?: StringFilter | string
    containerId?: StringFilter | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput> | null
  }

  export type ContainerInfoOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    containerId?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ContainerInfoWhereUniqueInput = {
    id?: number
  }

  export type ContainerInfoOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    containerId?: SortOrder
    _count?: ContainerInfoCountOrderByAggregateInput
    _avg?: ContainerInfoAvgOrderByAggregateInput
    _max?: ContainerInfoMaxOrderByAggregateInput
    _min?: ContainerInfoMinOrderByAggregateInput
    _sum?: ContainerInfoSumOrderByAggregateInput
  }

  export type ContainerInfoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContainerInfoScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContainerInfoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContainerInfoScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    network?: StringWithAggregatesFilter | string
    containerId?: StringWithAggregatesFilter | string
  }

  export type EnvironmentVariableWhereInput = {
    AND?: Enumerable<EnvironmentVariableWhereInput>
    OR?: Enumerable<EnvironmentVariableWhereInput>
    NOT?: Enumerable<EnvironmentVariableWhereInput>
    id?: IntFilter | number
    key?: StringFilter | string
    value?: StringFilter | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    serviceId?: IntFilter | number
  }

  export type EnvironmentVariableOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    service?: ServiceOrderByWithRelationInput
    serviceId?: SortOrder
  }

  export type EnvironmentVariableWhereUniqueInput = {
    id?: number
  }

  export type EnvironmentVariableOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    serviceId?: SortOrder
    _count?: EnvironmentVariableCountOrderByAggregateInput
    _avg?: EnvironmentVariableAvgOrderByAggregateInput
    _max?: EnvironmentVariableMaxOrderByAggregateInput
    _min?: EnvironmentVariableMinOrderByAggregateInput
    _sum?: EnvironmentVariableSumOrderByAggregateInput
  }

  export type EnvironmentVariableScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EnvironmentVariableScalarWhereWithAggregatesInput>
    OR?: Enumerable<EnvironmentVariableScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EnvironmentVariableScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    key?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
    serviceId?: IntWithAggregatesFilter | number
  }

  export type RedirectWhereInput = {
    AND?: Enumerable<RedirectWhereInput>
    OR?: Enumerable<RedirectWhereInput>
    NOT?: Enumerable<RedirectWhereInput>
    id?: IntFilter | number
    from?: StringFilter | string
    to?: StringFilter | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    serviceId?: IntFilter | number
  }

  export type RedirectOrderByWithRelationInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    service?: ServiceOrderByWithRelationInput
    serviceId?: SortOrder
  }

  export type RedirectWhereUniqueInput = {
    id?: number
  }

  export type RedirectOrderByWithAggregationInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    serviceId?: SortOrder
    _count?: RedirectCountOrderByAggregateInput
    _avg?: RedirectAvgOrderByAggregateInput
    _max?: RedirectMaxOrderByAggregateInput
    _min?: RedirectMinOrderByAggregateInput
    _sum?: RedirectSumOrderByAggregateInput
  }

  export type RedirectScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RedirectScalarWhereWithAggregatesInput>
    OR?: Enumerable<RedirectScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RedirectScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    from?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
    serviceId?: IntWithAggregatesFilter | number
  }

  export type ProjectWhereInput = {
    AND?: Enumerable<ProjectWhereInput>
    OR?: Enumerable<ProjectWhereInput>
    NOT?: Enumerable<ProjectWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    services?: ServiceListRelationFilter
    createdAt?: DateTimeFilter | Date | string
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    createdAt?: SortOrder
  }

  export type ProjectWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserCreateInput = {
    username: string
    hash: string
    salt: string
    createdAt?: Date | string
    Service?: ServiceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    hash: string
    salt: string
    createdAt?: Date | string
    Service?: ServiceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Service?: ServiceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Service?: ServiceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    hash: string
    salt: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateManyInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ImageCreateInput = {
    name: string
    tag: string
    repository: string
    services?: ServiceCreateNestedManyWithoutImageInput
    createdAt?: Date | string
  }

  export type ImageUncheckedCreateInput = {
    id?: number
    name: string
    tag: string
    repository: string
    services?: ServiceUncheckedCreateNestedManyWithoutImageInput
    createdAt?: Date | string
  }

  export type ImageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    services?: ServiceUpdateManyWithoutImageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    services?: ServiceUncheckedUpdateManyWithoutImageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyInput = {
    id?: number
    name: string
    tag: string
    repository: string
    createdAt?: Date | string
  }

  export type ImageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContainerInfoCreateInput = {
    name: string
    network: string
    containerId: string
    service?: ServiceCreateNestedOneWithoutContainerInfoInput
  }

  export type ContainerInfoUncheckedCreateInput = {
    id?: number
    name: string
    network: string
    containerId: string
    service?: ServiceUncheckedCreateNestedOneWithoutContainerInfoInput
  }

  export type ContainerInfoUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
    service?: ServiceUpdateOneWithoutContainerInfoNestedInput
  }

  export type ContainerInfoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
    service?: ServiceUncheckedUpdateOneWithoutContainerInfoNestedInput
  }

  export type ContainerInfoCreateManyInput = {
    id?: number
    name: string
    network: string
    containerId: string
  }

  export type ContainerInfoUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
  }

  export type ContainerInfoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
  }

  export type EnvironmentVariableCreateInput = {
    key: string
    value: string
    service: ServiceCreateNestedOneWithoutEnvironmentVariablesInput
  }

  export type EnvironmentVariableUncheckedCreateInput = {
    id?: number
    key: string
    value: string
    serviceId: number
  }

  export type EnvironmentVariableUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    service?: ServiceUpdateOneRequiredWithoutEnvironmentVariablesNestedInput
  }

  export type EnvironmentVariableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type EnvironmentVariableCreateManyInput = {
    id?: number
    key: string
    value: string
    serviceId: number
  }

  export type EnvironmentVariableUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type EnvironmentVariableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type RedirectCreateInput = {
    from: string
    to: string
    service: ServiceCreateNestedOneWithoutRedirectsInput
  }

  export type RedirectUncheckedCreateInput = {
    id?: number
    from: string
    to: string
    serviceId: number
  }

  export type RedirectUpdateInput = {
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    service?: ServiceUpdateOneRequiredWithoutRedirectsNestedInput
  }

  export type RedirectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type RedirectCreateManyInput = {
    id?: number
    from: string
    to: string
    serviceId: number
  }

  export type RedirectUpdateManyMutationInput = {
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type RedirectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type ProjectCreateInput = {
    name: string
    services?: ServiceCreateNestedManyWithoutProjectInput
    createdAt?: Date | string
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    name: string
    services?: ServiceUncheckedCreateNestedManyWithoutProjectInput
    createdAt?: Date | string
  }

  export type ProjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUpdateManyWithoutProjectNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    services?: ServiceUncheckedUpdateManyWithoutProjectNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    hash?: SortOrder
    salt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EnumServiceStatusFilter = {
    equals?: ServiceStatus
    in?: Enumerable<ServiceStatus>
    notIn?: Enumerable<ServiceStatus>
    not?: NestedEnumServiceStatusFilter | ServiceStatus
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type ImageRelationFilter = {
    is?: ImageWhereInput
    isNot?: ImageWhereInput
  }

  export type EnvironmentVariableListRelationFilter = {
    every?: EnvironmentVariableWhereInput
    some?: EnvironmentVariableWhereInput
    none?: EnvironmentVariableWhereInput
  }

  export type RedirectListRelationFilter = {
    every?: RedirectWhereInput
    some?: RedirectWhereInput
    none?: RedirectWhereInput
  }

  export type ContainerInfoRelationFilter = {
    is?: ContainerInfoWhereInput | null
    isNot?: ContainerInfoWhereInput | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type ProjectRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EnvironmentVariableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RedirectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    hosts?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    userId?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    containerInfoId?: SortOrder
    projectId?: SortOrder
    order?: SortOrder
    userId?: SortOrder
  }

  export type EnumServiceStatusWithAggregatesFilter = {
    equals?: ServiceStatus
    in?: Enumerable<ServiceStatus>
    notIn?: Enumerable<ServiceStatus>
    not?: NestedEnumServiceStatusWithAggregatesFilter | ServiceStatus
    _count?: NestedIntFilter
    _min?: NestedEnumServiceStatusFilter
    _max?: NestedEnumServiceStatusFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type ImageImageIdentifierCompoundUniqueInput = {
    name: string
    tag: string
    repository: string
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    repository?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    repository?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tag?: SortOrder
    repository?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ContainerInfoCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    containerId?: SortOrder
  }

  export type ContainerInfoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContainerInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    containerId?: SortOrder
  }

  export type ContainerInfoMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    containerId?: SortOrder
  }

  export type ContainerInfoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnvironmentVariableCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    serviceId?: SortOrder
  }

  export type EnvironmentVariableAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type EnvironmentVariableMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    serviceId?: SortOrder
  }

  export type EnvironmentVariableMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    serviceId?: SortOrder
  }

  export type EnvironmentVariableSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type RedirectCountOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    serviceId?: SortOrder
  }

  export type RedirectAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type RedirectMaxOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    serviceId?: SortOrder
  }

  export type RedirectMinOrderByAggregateInput = {
    id?: SortOrder
    from?: SortOrder
    to?: SortOrder
    serviceId?: SortOrder
  }

  export type RedirectSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ServiceCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutUserInput>, Enumerable<ServiceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutUserInput>
    createMany?: ServiceCreateManyUserInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ServiceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutUserInput>, Enumerable<ServiceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutUserInput>
    createMany?: ServiceCreateManyUserInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServiceUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutUserInput>, Enumerable<ServiceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ServiceCreateManyUserInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutUserInput>, Enumerable<ServiceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ServiceCreateManyUserInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ServiceCreatehostsInput = {
    set: Enumerable<string>
  }

  export type ImageCreateNestedOneWithoutServicesInput = {
    create?: XOR<ImageCreateWithoutServicesInput, ImageUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ImageCreateOrConnectWithoutServicesInput
    connect?: ImageWhereUniqueInput
  }

  export type EnvironmentVariableCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<EnvironmentVariableCreateWithoutServiceInput>, Enumerable<EnvironmentVariableUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<EnvironmentVariableCreateOrConnectWithoutServiceInput>
    createMany?: EnvironmentVariableCreateManyServiceInputEnvelope
    connect?: Enumerable<EnvironmentVariableWhereUniqueInput>
  }

  export type RedirectCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<RedirectCreateWithoutServiceInput>, Enumerable<RedirectUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<RedirectCreateOrConnectWithoutServiceInput>
    createMany?: RedirectCreateManyServiceInputEnvelope
    connect?: Enumerable<RedirectWhereUniqueInput>
  }

  export type ContainerInfoCreateNestedOneWithoutServiceInput = {
    create?: XOR<ContainerInfoCreateWithoutServiceInput, ContainerInfoUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ContainerInfoCreateOrConnectWithoutServiceInput
    connect?: ContainerInfoWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutServicesInput = {
    create?: XOR<ProjectCreateWithoutServicesInput, ProjectUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutServicesInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutServiceInput = {
    create?: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceInput
    connect?: UserWhereUniqueInput
  }

  export type EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<EnvironmentVariableCreateWithoutServiceInput>, Enumerable<EnvironmentVariableUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<EnvironmentVariableCreateOrConnectWithoutServiceInput>
    createMany?: EnvironmentVariableCreateManyServiceInputEnvelope
    connect?: Enumerable<EnvironmentVariableWhereUniqueInput>
  }

  export type RedirectUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<Enumerable<RedirectCreateWithoutServiceInput>, Enumerable<RedirectUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<RedirectCreateOrConnectWithoutServiceInput>
    createMany?: RedirectCreateManyServiceInputEnvelope
    connect?: Enumerable<RedirectWhereUniqueInput>
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: ServiceStatus
  }

  export type ServiceUpdatehostsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type ImageUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<ImageCreateWithoutServicesInput, ImageUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ImageCreateOrConnectWithoutServicesInput
    upsert?: ImageUpsertWithoutServicesInput
    connect?: ImageWhereUniqueInput
    update?: XOR<ImageUpdateWithoutServicesInput, ImageUncheckedUpdateWithoutServicesInput>
  }

  export type EnvironmentVariableUpdateManyWithoutServiceNestedInput = {
    create?: XOR<Enumerable<EnvironmentVariableCreateWithoutServiceInput>, Enumerable<EnvironmentVariableUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<EnvironmentVariableCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<EnvironmentVariableUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: EnvironmentVariableCreateManyServiceInputEnvelope
    set?: Enumerable<EnvironmentVariableWhereUniqueInput>
    disconnect?: Enumerable<EnvironmentVariableWhereUniqueInput>
    delete?: Enumerable<EnvironmentVariableWhereUniqueInput>
    connect?: Enumerable<EnvironmentVariableWhereUniqueInput>
    update?: Enumerable<EnvironmentVariableUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<EnvironmentVariableUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<EnvironmentVariableScalarWhereInput>
  }

  export type RedirectUpdateManyWithoutServiceNestedInput = {
    create?: XOR<Enumerable<RedirectCreateWithoutServiceInput>, Enumerable<RedirectUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<RedirectCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<RedirectUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: RedirectCreateManyServiceInputEnvelope
    set?: Enumerable<RedirectWhereUniqueInput>
    disconnect?: Enumerable<RedirectWhereUniqueInput>
    delete?: Enumerable<RedirectWhereUniqueInput>
    connect?: Enumerable<RedirectWhereUniqueInput>
    update?: Enumerable<RedirectUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<RedirectUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<RedirectScalarWhereInput>
  }

  export type ContainerInfoUpdateOneWithoutServiceNestedInput = {
    create?: XOR<ContainerInfoCreateWithoutServiceInput, ContainerInfoUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ContainerInfoCreateOrConnectWithoutServiceInput
    upsert?: ContainerInfoUpsertWithoutServiceInput
    disconnect?: boolean
    delete?: boolean
    connect?: ContainerInfoWhereUniqueInput
    update?: XOR<ContainerInfoUpdateWithoutServiceInput, ContainerInfoUncheckedUpdateWithoutServiceInput>
  }

  export type ProjectUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<ProjectCreateWithoutServicesInput, ProjectUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutServicesInput
    upsert?: ProjectUpsertWithoutServicesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutServicesInput, ProjectUncheckedUpdateWithoutServicesInput>
  }

  export type UserUpdateOneRequiredWithoutServiceNestedInput = {
    create?: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceInput
    upsert?: UserUpsertWithoutServiceInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutServiceInput, UserUncheckedUpdateWithoutServiceInput>
  }

  export type EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<Enumerable<EnvironmentVariableCreateWithoutServiceInput>, Enumerable<EnvironmentVariableUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<EnvironmentVariableCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<EnvironmentVariableUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: EnvironmentVariableCreateManyServiceInputEnvelope
    set?: Enumerable<EnvironmentVariableWhereUniqueInput>
    disconnect?: Enumerable<EnvironmentVariableWhereUniqueInput>
    delete?: Enumerable<EnvironmentVariableWhereUniqueInput>
    connect?: Enumerable<EnvironmentVariableWhereUniqueInput>
    update?: Enumerable<EnvironmentVariableUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<EnvironmentVariableUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<EnvironmentVariableScalarWhereInput>
  }

  export type RedirectUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<Enumerable<RedirectCreateWithoutServiceInput>, Enumerable<RedirectUncheckedCreateWithoutServiceInput>>
    connectOrCreate?: Enumerable<RedirectCreateOrConnectWithoutServiceInput>
    upsert?: Enumerable<RedirectUpsertWithWhereUniqueWithoutServiceInput>
    createMany?: RedirectCreateManyServiceInputEnvelope
    set?: Enumerable<RedirectWhereUniqueInput>
    disconnect?: Enumerable<RedirectWhereUniqueInput>
    delete?: Enumerable<RedirectWhereUniqueInput>
    connect?: Enumerable<RedirectWhereUniqueInput>
    update?: Enumerable<RedirectUpdateWithWhereUniqueWithoutServiceInput>
    updateMany?: Enumerable<RedirectUpdateManyWithWhereWithoutServiceInput>
    deleteMany?: Enumerable<RedirectScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceCreateNestedManyWithoutImageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutImageInput>, Enumerable<ServiceUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutImageInput>
    createMany?: ServiceCreateManyImageInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ServiceUncheckedCreateNestedManyWithoutImageInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutImageInput>, Enumerable<ServiceUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutImageInput>
    createMany?: ServiceCreateManyImageInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ServiceUpdateManyWithoutImageNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutImageInput>, Enumerable<ServiceUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutImageInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutImageInput>
    createMany?: ServiceCreateManyImageInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutImageInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutImageInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ServiceUncheckedUpdateManyWithoutImageNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutImageInput>, Enumerable<ServiceUncheckedCreateWithoutImageInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutImageInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutImageInput>
    createMany?: ServiceCreateManyImageInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutImageInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutImageInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ServiceCreateNestedOneWithoutContainerInfoInput = {
    create?: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutContainerInfoInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUncheckedCreateNestedOneWithoutContainerInfoInput = {
    create?: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutContainerInfoInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneWithoutContainerInfoNestedInput = {
    create?: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutContainerInfoInput
    upsert?: ServiceUpsertWithoutContainerInfoInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutContainerInfoInput, ServiceUncheckedUpdateWithoutContainerInfoInput>
  }

  export type ServiceUncheckedUpdateOneWithoutContainerInfoNestedInput = {
    create?: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutContainerInfoInput
    upsert?: ServiceUpsertWithoutContainerInfoInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutContainerInfoInput, ServiceUncheckedUpdateWithoutContainerInfoInput>
  }

  export type ServiceCreateNestedOneWithoutEnvironmentVariablesInput = {
    create?: XOR<ServiceCreateWithoutEnvironmentVariablesInput, ServiceUncheckedCreateWithoutEnvironmentVariablesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEnvironmentVariablesInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutEnvironmentVariablesNestedInput = {
    create?: XOR<ServiceCreateWithoutEnvironmentVariablesInput, ServiceUncheckedCreateWithoutEnvironmentVariablesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutEnvironmentVariablesInput
    upsert?: ServiceUpsertWithoutEnvironmentVariablesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutEnvironmentVariablesInput, ServiceUncheckedUpdateWithoutEnvironmentVariablesInput>
  }

  export type ServiceCreateNestedOneWithoutRedirectsInput = {
    create?: XOR<ServiceCreateWithoutRedirectsInput, ServiceUncheckedCreateWithoutRedirectsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutRedirectsInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutRedirectsNestedInput = {
    create?: XOR<ServiceCreateWithoutRedirectsInput, ServiceUncheckedCreateWithoutRedirectsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutRedirectsInput
    upsert?: ServiceUpsertWithoutRedirectsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<ServiceUpdateWithoutRedirectsInput, ServiceUncheckedUpdateWithoutRedirectsInput>
  }

  export type ServiceCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutProjectInput>, Enumerable<ServiceUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutProjectInput>
    createMany?: ServiceCreateManyProjectInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ServiceUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutProjectInput>, Enumerable<ServiceUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutProjectInput>
    createMany?: ServiceCreateManyProjectInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  export type ServiceUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutProjectInput>, Enumerable<ServiceUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ServiceCreateManyProjectInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type ServiceUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutProjectInput>, Enumerable<ServiceUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ServiceCreateManyProjectInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumServiceStatusFilter = {
    equals?: ServiceStatus
    in?: Enumerable<ServiceStatus>
    notIn?: Enumerable<ServiceStatus>
    not?: NestedEnumServiceStatusFilter | ServiceStatus
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumServiceStatusWithAggregatesFilter = {
    equals?: ServiceStatus
    in?: Enumerable<ServiceStatus>
    notIn?: Enumerable<ServiceStatus>
    not?: NestedEnumServiceStatusWithAggregatesFilter | ServiceStatus
    _count?: NestedIntFilter
    _min?: NestedEnumServiceStatusFilter
    _max?: NestedEnumServiceStatusFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type ServiceCreateWithoutUserInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
  }

  export type ServiceUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutUserInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput>
  }

  export type ServiceCreateManyUserInputEnvelope = {
    data: Enumerable<ServiceCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutUserInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutUserInput, ServiceUncheckedUpdateWithoutUserInput>
    create: XOR<ServiceCreateWithoutUserInput, ServiceUncheckedCreateWithoutUserInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutUserInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutUserInput, ServiceUncheckedUpdateWithoutUserInput>
  }

  export type ServiceUpdateManyWithWhereWithoutUserInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: Enumerable<ServiceScalarWhereInput>
    OR?: Enumerable<ServiceScalarWhereInput>
    NOT?: Enumerable<ServiceScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    status?: EnumServiceStatusFilter | ServiceStatus
    hosts?: StringNullableListFilter
    imageId?: IntFilter | number
    containerInfoId?: IntNullableFilter | number | null
    projectId?: IntFilter | number
    order?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
  }

  export type ImageCreateWithoutServicesInput = {
    name: string
    tag: string
    repository: string
    createdAt?: Date | string
  }

  export type ImageUncheckedCreateWithoutServicesInput = {
    id?: number
    name: string
    tag: string
    repository: string
    createdAt?: Date | string
  }

  export type ImageCreateOrConnectWithoutServicesInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutServicesInput, ImageUncheckedCreateWithoutServicesInput>
  }

  export type EnvironmentVariableCreateWithoutServiceInput = {
    key: string
    value: string
  }

  export type EnvironmentVariableUncheckedCreateWithoutServiceInput = {
    id?: number
    key: string
    value: string
  }

  export type EnvironmentVariableCreateOrConnectWithoutServiceInput = {
    where: EnvironmentVariableWhereUniqueInput
    create: XOR<EnvironmentVariableCreateWithoutServiceInput, EnvironmentVariableUncheckedCreateWithoutServiceInput>
  }

  export type EnvironmentVariableCreateManyServiceInputEnvelope = {
    data: Enumerable<EnvironmentVariableCreateManyServiceInput>
    skipDuplicates?: boolean
  }

  export type RedirectCreateWithoutServiceInput = {
    from: string
    to: string
  }

  export type RedirectUncheckedCreateWithoutServiceInput = {
    id?: number
    from: string
    to: string
  }

  export type RedirectCreateOrConnectWithoutServiceInput = {
    where: RedirectWhereUniqueInput
    create: XOR<RedirectCreateWithoutServiceInput, RedirectUncheckedCreateWithoutServiceInput>
  }

  export type RedirectCreateManyServiceInputEnvelope = {
    data: Enumerable<RedirectCreateManyServiceInput>
    skipDuplicates?: boolean
  }

  export type ContainerInfoCreateWithoutServiceInput = {
    name: string
    network: string
    containerId: string
  }

  export type ContainerInfoUncheckedCreateWithoutServiceInput = {
    id?: number
    name: string
    network: string
    containerId: string
  }

  export type ContainerInfoCreateOrConnectWithoutServiceInput = {
    where: ContainerInfoWhereUniqueInput
    create: XOR<ContainerInfoCreateWithoutServiceInput, ContainerInfoUncheckedCreateWithoutServiceInput>
  }

  export type ProjectCreateWithoutServicesInput = {
    name: string
    createdAt?: Date | string
  }

  export type ProjectUncheckedCreateWithoutServicesInput = {
    id?: number
    name: string
    createdAt?: Date | string
  }

  export type ProjectCreateOrConnectWithoutServicesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutServicesInput, ProjectUncheckedCreateWithoutServicesInput>
  }

  export type UserCreateWithoutServiceInput = {
    username: string
    hash: string
    salt: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutServiceInput = {
    id?: number
    username: string
    hash: string
    salt: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutServiceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
  }

  export type ImageUpsertWithoutServicesInput = {
    update: XOR<ImageUpdateWithoutServicesInput, ImageUncheckedUpdateWithoutServicesInput>
    create: XOR<ImageCreateWithoutServicesInput, ImageUncheckedCreateWithoutServicesInput>
  }

  export type ImageUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    repository?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnvironmentVariableUpsertWithWhereUniqueWithoutServiceInput = {
    where: EnvironmentVariableWhereUniqueInput
    update: XOR<EnvironmentVariableUpdateWithoutServiceInput, EnvironmentVariableUncheckedUpdateWithoutServiceInput>
    create: XOR<EnvironmentVariableCreateWithoutServiceInput, EnvironmentVariableUncheckedCreateWithoutServiceInput>
  }

  export type EnvironmentVariableUpdateWithWhereUniqueWithoutServiceInput = {
    where: EnvironmentVariableWhereUniqueInput
    data: XOR<EnvironmentVariableUpdateWithoutServiceInput, EnvironmentVariableUncheckedUpdateWithoutServiceInput>
  }

  export type EnvironmentVariableUpdateManyWithWhereWithoutServiceInput = {
    where: EnvironmentVariableScalarWhereInput
    data: XOR<EnvironmentVariableUpdateManyMutationInput, EnvironmentVariableUncheckedUpdateManyWithoutEnvironmentVariablesInput>
  }

  export type EnvironmentVariableScalarWhereInput = {
    AND?: Enumerable<EnvironmentVariableScalarWhereInput>
    OR?: Enumerable<EnvironmentVariableScalarWhereInput>
    NOT?: Enumerable<EnvironmentVariableScalarWhereInput>
    id?: IntFilter | number
    key?: StringFilter | string
    value?: StringFilter | string
    serviceId?: IntFilter | number
  }

  export type RedirectUpsertWithWhereUniqueWithoutServiceInput = {
    where: RedirectWhereUniqueInput
    update: XOR<RedirectUpdateWithoutServiceInput, RedirectUncheckedUpdateWithoutServiceInput>
    create: XOR<RedirectCreateWithoutServiceInput, RedirectUncheckedCreateWithoutServiceInput>
  }

  export type RedirectUpdateWithWhereUniqueWithoutServiceInput = {
    where: RedirectWhereUniqueInput
    data: XOR<RedirectUpdateWithoutServiceInput, RedirectUncheckedUpdateWithoutServiceInput>
  }

  export type RedirectUpdateManyWithWhereWithoutServiceInput = {
    where: RedirectScalarWhereInput
    data: XOR<RedirectUpdateManyMutationInput, RedirectUncheckedUpdateManyWithoutRedirectsInput>
  }

  export type RedirectScalarWhereInput = {
    AND?: Enumerable<RedirectScalarWhereInput>
    OR?: Enumerable<RedirectScalarWhereInput>
    NOT?: Enumerable<RedirectScalarWhereInput>
    id?: IntFilter | number
    from?: StringFilter | string
    to?: StringFilter | string
    serviceId?: IntFilter | number
  }

  export type ContainerInfoUpsertWithoutServiceInput = {
    update: XOR<ContainerInfoUpdateWithoutServiceInput, ContainerInfoUncheckedUpdateWithoutServiceInput>
    create: XOR<ContainerInfoCreateWithoutServiceInput, ContainerInfoUncheckedCreateWithoutServiceInput>
  }

  export type ContainerInfoUpdateWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
  }

  export type ContainerInfoUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    containerId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpsertWithoutServicesInput = {
    update: XOR<ProjectUpdateWithoutServicesInput, ProjectUncheckedUpdateWithoutServicesInput>
    create: XOR<ProjectCreateWithoutServicesInput, ProjectUncheckedCreateWithoutServicesInput>
  }

  export type ProjectUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutServiceInput = {
    update: XOR<UserUpdateWithoutServiceInput, UserUncheckedUpdateWithoutServiceInput>
    create: XOR<UserCreateWithoutServiceInput, UserUncheckedCreateWithoutServiceInput>
  }

  export type UserUpdateWithoutServiceInput = {
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    salt?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateWithoutImageInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutImageInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceCreateOrConnectWithoutImageInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutImageInput, ServiceUncheckedCreateWithoutImageInput>
  }

  export type ServiceCreateManyImageInputEnvelope = {
    data: Enumerable<ServiceCreateManyImageInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutImageInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutImageInput, ServiceUncheckedUpdateWithoutImageInput>
    create: XOR<ServiceCreateWithoutImageInput, ServiceUncheckedCreateWithoutImageInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutImageInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutImageInput, ServiceUncheckedUpdateWithoutImageInput>
  }

  export type ServiceUpdateManyWithWhereWithoutImageInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  export type ServiceCreateWithoutContainerInfoInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutContainerInfoInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceCreateOrConnectWithoutContainerInfoInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
  }

  export type ServiceUpsertWithoutContainerInfoInput = {
    update: XOR<ServiceUpdateWithoutContainerInfoInput, ServiceUncheckedUpdateWithoutContainerInfoInput>
    create: XOR<ServiceCreateWithoutContainerInfoInput, ServiceUncheckedCreateWithoutContainerInfoInput>
  }

  export type ServiceUpdateWithoutContainerInfoInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutContainerInfoInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateWithoutEnvironmentVariablesInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutEnvironmentVariablesInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceCreateOrConnectWithoutEnvironmentVariablesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutEnvironmentVariablesInput, ServiceUncheckedCreateWithoutEnvironmentVariablesInput>
  }

  export type ServiceUpsertWithoutEnvironmentVariablesInput = {
    update: XOR<ServiceUpdateWithoutEnvironmentVariablesInput, ServiceUncheckedUpdateWithoutEnvironmentVariablesInput>
    create: XOR<ServiceCreateWithoutEnvironmentVariablesInput, ServiceUncheckedCreateWithoutEnvironmentVariablesInput>
  }

  export type ServiceUpdateWithoutEnvironmentVariablesInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutEnvironmentVariablesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateWithoutRedirectsInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    project: ProjectCreateNestedOneWithoutServicesInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutRedirectsInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceCreateOrConnectWithoutRedirectsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutRedirectsInput, ServiceUncheckedCreateWithoutRedirectsInput>
  }

  export type ServiceUpsertWithoutRedirectsInput = {
    update: XOR<ServiceUpdateWithoutRedirectsInput, ServiceUncheckedUpdateWithoutRedirectsInput>
    create: XOR<ServiceCreateWithoutRedirectsInput, ServiceUncheckedCreateWithoutRedirectsInput>
  }

  export type ServiceUpdateWithoutRedirectsInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutRedirectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateWithoutProjectInput = {
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    image: ImageCreateNestedOneWithoutServicesInput
    environmentVariables?: EnvironmentVariableCreateNestedManyWithoutServiceInput
    redirects?: RedirectCreateNestedManyWithoutServiceInput
    containerInfo?: ContainerInfoCreateNestedOneWithoutServiceInput
    order?: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutProjectInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    environmentVariables?: EnvironmentVariableUncheckedCreateNestedManyWithoutServiceInput
    redirects?: RedirectUncheckedCreateNestedManyWithoutServiceInput
    containerInfoId?: number | null
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceCreateOrConnectWithoutProjectInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutProjectInput, ServiceUncheckedCreateWithoutProjectInput>
  }

  export type ServiceCreateManyProjectInputEnvelope = {
    data: Enumerable<ServiceCreateManyProjectInput>
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithWhereUniqueWithoutProjectInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutProjectInput, ServiceUncheckedUpdateWithoutProjectInput>
    create: XOR<ServiceCreateWithoutProjectInput, ServiceUncheckedCreateWithoutProjectInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutProjectInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutProjectInput, ServiceUncheckedUpdateWithoutProjectInput>
  }

  export type ServiceUpdateManyWithWhereWithoutProjectInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  export type ServiceCreateManyUserInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
  }

  export type ServiceUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnvironmentVariableCreateManyServiceInput = {
    id?: number
    key: string
    value: string
  }

  export type RedirectCreateManyServiceInput = {
    id?: number
    from: string
    to: string
  }

  export type EnvironmentVariableUpdateWithoutServiceInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type EnvironmentVariableUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type EnvironmentVariableUncheckedUpdateManyWithoutEnvironmentVariablesInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type RedirectUpdateWithoutServiceInput = {
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type RedirectUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type RedirectUncheckedUpdateManyWithoutRedirectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    from?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateManyImageInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    containerInfoId?: number | null
    projectId: number
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceUpdateWithoutImageInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    project?: ProjectUpdateOneRequiredWithoutServicesNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutImageInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUncheckedUpdateManyWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    projectId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateManyProjectInput = {
    id?: number
    name: string
    status?: ServiceStatus
    hosts?: ServiceCreatehostsInput | Enumerable<string>
    imageId: number
    containerInfoId?: number | null
    order?: number
    createdAt?: Date | string
    userId: number
  }

  export type ServiceUpdateWithoutProjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    image?: ImageUpdateOneRequiredWithoutServicesNestedInput
    environmentVariables?: EnvironmentVariableUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUpdateManyWithoutServiceNestedInput
    containerInfo?: ContainerInfoUpdateOneWithoutServiceNestedInput
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumServiceStatusFieldUpdateOperationsInput | ServiceStatus
    hosts?: ServiceUpdatehostsInput | Enumerable<string>
    imageId?: IntFieldUpdateOperationsInput | number
    environmentVariables?: EnvironmentVariableUncheckedUpdateManyWithoutServiceNestedInput
    redirects?: RedirectUncheckedUpdateManyWithoutServiceNestedInput
    containerInfoId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

/**MANUALLY WRITTEN TYPES**/

const populatedService = Prisma.validator<Prisma.ServiceArgs>()({
    include: {
        image: true,
        project: true,
        containerInfo: true,
        environmentVariables: true,
        redirects: true,
    },
});

export type PopulatedService = Prisma.ServiceGetPayload<
    typeof populatedService
>;
