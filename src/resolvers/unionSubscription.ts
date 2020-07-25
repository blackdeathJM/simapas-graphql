import GMR from 'graphql-merge-resolvers';
import docExtSubscription from "./docExt/docExt.subscription.resolver";
import docInternaSubscription from "./docInterna/docInterna.subscription.resolver";
import usuarioSubscriptionResolver from "./usuarios/usuario.subscription.resolver";

const unionSubscriptionResolver = GMR.merge(
    [
        docExtSubscription,
        docInternaSubscription,
        usuarioSubscriptionResolver
    ]);

export default unionSubscriptionResolver;
