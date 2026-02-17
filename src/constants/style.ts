class Style {
  static HEADER_HEIGHT = 72;
  static SIDEBAR_WIDTH = 398;
  static FOOTER_HEIGHT = 100;

  header = {
    height: Style.HEADER_HEIGHT,
  } as const;

  body = {
    height: `calc(100dvh - ${Style.HEADER_HEIGHT}px)`,
  };

  aside = {
    width: Style.SIDEBAR_WIDTH,
  } as const;

  footer = {
    height: Style.FOOTER_HEIGHT,
  } as const;
}

export const STYLE = new Style();
