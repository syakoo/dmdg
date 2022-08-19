# Module Dependency Graph in src

<!-- DMDG BEGIN -->

```mermaid
flowchart LR

0["cac"]
subgraph 1["dependency-cruiser"]
subgraph 2["config-utl"]
3["extract-ts-config"]
end
end
4["fs"]
5["path"]
subgraph 6["src"]
7["cli.ts"]
8["drawer.ts"]
9["tsConfigPathResolver.ts"]
a["types.d.ts"]
end
7-->8
7-->9
7-->0
8-->1
8-->3
8-->4
8-->5
9-->4
9-->5

style 7 fill:lime,color:black
style 8 fill:lime,color:black
style 9 fill:lime,color:black
style a fill:lime,color:black
```

<!-- DMDG END -->
