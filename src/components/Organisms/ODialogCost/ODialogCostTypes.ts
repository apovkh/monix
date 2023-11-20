export enum E_ABLUR_BACKGROUND {
  Light = 'light',
  Dark = 'dark',
}

export interface IABlurProps {
  radiusSize?: string
  background?: E_ABLUR_BACKGROUND
}
