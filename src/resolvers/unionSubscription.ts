import GMR from 'graphql-merge-resolvers';
import docExtSubscription from "./docExt/docExt.subscription.resolver";
import docInternaSubscription from "./docInterna/docInterna.subscription.resolver";

const unionSubscriptionResolver = GMR.merge([docExtSubscription, docInternaSubscription]);

export default unionSubscriptionResolver;
