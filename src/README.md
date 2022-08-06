# Module Dependency Graph in src

<!-- DMDG BEGIN -->
```mermaid
flowchart LR

subgraph 0["src"]
1["cli.ts"]
2["drawer.ts"]
end
3["fs"]
4["path"]
1-->2
2-->3
2-->4

```
<!-- DMDG END -->
