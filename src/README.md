# Module Dependency Graph in src

<!-- DMDG BEGIN -->
```mermaid
flowchart LR

subgraph 0["src"]
1["cli.ts"]
2["drawer.ts"]
8["types.d.ts"]
end
subgraph 3["dependency-cruiser"]
subgraph 4["config-utl"]
5["extract-ts-config"]
end
end
6["fs"]
7["path"]
1-->2
2-->5
2-->6
2-->7

style 1 fill:lime,color:black
style 2 fill:lime,color:black
style 8 fill:lime,color:black
```
<!-- DMDG END -->
