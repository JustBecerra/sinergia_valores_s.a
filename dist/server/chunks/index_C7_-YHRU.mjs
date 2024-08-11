export { renderers } from '../renderers.mjs';

const page = () => import('./prerender_CFPop_Kl.mjs').then(n => n.i);

export { page };
