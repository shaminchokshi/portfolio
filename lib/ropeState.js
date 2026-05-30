// Shared rope/hand state so the CSS rope can follow the avatar's hand.
// handY = screen Y (px) where the avatar's gripping hand is.
// grabbed = whether he's currently holding the rope.
export const ropeState = {
  handY: null,     // px from top of viewport
  handX: null,     // px from left
  grabbed: false,
};