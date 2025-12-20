import { atom } from 'nanostores';

/**
 * Drawer Store
 *
 * Shared state for drawer open/close across Astro islands.
 * Header and Drawer components both import this store to communicate
 * without needing to be in the same React tree.
 *
 * @see https://docs.astro.build/en/recipes/sharing-state-islands/
 */

/** Whether the drawer is currently open */
export const isDrawerOpen = atom<boolean>(false);

/** Open the drawer */
export const openDrawer = () => isDrawerOpen.set(true);

/** Close the drawer */
export const closeDrawer = () => isDrawerOpen.set(false);

/** Toggle the drawer open/closed */
export const toggleDrawer = () => isDrawerOpen.set(!isDrawerOpen.get());
