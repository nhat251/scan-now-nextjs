class Path {
  home = "/" as const;

  auth = {
    login: "/login" as const,
  };

  blogs = {
    root: "/blogs" as const,
    get _id() {
      return (id: string) => `${this.root}/${id}` as const;
    },
  };

  insights = {
    root: "/insights" as const,
    get _slug() {
      return (slug: string) => `${this.root}/${slug}` as const;
    },
  };
}

export const PATH = new Path();
