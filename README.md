Tool to draw a graph of module dependencies in a directory as Markdown

# Installation

```bash
npm install -D @syakoo/dmdg
```

# Usage

The following will generate a dependency graph for a module in `./src` as README.md:

```bash
npx @syakoo/dmdg draw ./src
```

You can output the results in a block by writing the README as follows:

```Markdown
<!-- DMDG BEGIN -->
Output here
<!-- DMDG END -->
```

The default graph depth is 5, but you can set it yourself:

```bash
npx @syakoo/dmdg draw ./src --maxDepth=10
```

# LICENSE

MIT
