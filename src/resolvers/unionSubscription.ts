import GMR from 'graphql-merge-resolvers';
import docExtSubscription from "./docExt/docExt.subscription.resolver";
import usuarioSubscriptionResolver from "./usuarios/usuario.subscription.resolver";

const unionSubscriptionResolver = GMR.merge(
    [
        docExtSubscription,
        usuarioSubscriptionResolver
    ]);

export default unionSubscriptionResolver;
