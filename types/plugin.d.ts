import { FastifyDecorators, FastifyInstance } from './instance'
import { RawServerBase, RawRequestDefaultExpression, RawReplyDefaultExpression, RawServerDefault } from './utils'
import { FastifyTypeProvider, FastifyTypeProviderDefault } from './type-provider'
import { FastifyBaseLogger } from './logger'

export type FastifyPluginOptions = Record<string, any>

/**
 * FastifyPluginCallback
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyPluginCallback<
  Options extends FastifyPluginOptions = FastifyPluginOptions,
  Server extends RawServerBase = RawServerDefault,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  Decorators extends FastifyDecorators = FastifyDecorators,
  NewDecorators extends FastifyDecorators = Decorators,
  NewTypeProvider extends FastifyTypeProvider = TypeProvider
> = (
  instance: FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, Logger, TypeProvider, Decorators>,
  opts: Options,
  done: (err?: Error) => void
) => FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, Logger, NewTypeProvider, NewDecorators>

/**
 * FastifyPluginAsync
 *
 * Fastify allows the user to extend its functionalities with plugins. A plugin can be a set of routes, a server decorator or whatever. To activate plugins, use the `fastify.register()` method.
 */
export type FastifyPluginAsync<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
  Decorators extends FastifyDecorators = FastifyDecorators,
  NewDecorators extends FastifyDecorators = Decorators,
  NewTypeProvider extends FastifyTypeProvider = TypeProvider
> = (
  instance: FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, Logger, TypeProvider, NewDecorators>,
  opts: Options
) => Promise<FastifyInstance<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, Logger, NewTypeProvider, NewDecorators>>

/**
 * Generic plugin type.
 * @deprecated union type doesn't work well with type inference in TS and is therefore deprecated in favor of explicit types. Use `FastifyPluginCallback` or `FastifyPluginAsync` instead. To activate
 * plugins use `FastifyRegister`. https://fastify.dev/docs/latest/Reference/TypeScript/#register
 */
export type FastifyPlugin<Options extends FastifyPluginOptions = Record<never, never>> = FastifyPluginCallback<Options> | FastifyPluginAsync<Options>
