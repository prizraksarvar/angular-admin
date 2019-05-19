
export enum MouseButtonState {
  free,
  pressed
}

export class MouseState {
  firstButton: MouseButtonState = MouseButtonState.free;
  secondButton: MouseButtonState = MouseButtonState.free;
  thirdButton: MouseButtonState = MouseButtonState.free;
}