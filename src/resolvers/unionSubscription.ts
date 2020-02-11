import {merge} from "lodash";
import subscription from "./subscription";
import docExtSubscription from "./docExt/docExt.subscription.resolver";
import docInternaSubscription from "./docInterna/docInterna.subscription.resolver";

const unionSubscriptionResolver = merge(subscription, docExtSubscription, docInternaSubscription);

export default unionSubscriptionResolver;
