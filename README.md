![cover](./cover.jpg)

Chat bubble tool for YouTube
============================

A tool for recording typing animations and sounds with imitated chat UI.

- LIVE: https://cutbypham.github.io/chat-bubbles-for-youtube/
- [Video tutorial](https://youtu.be/zu_vqAWHy_E)

Clone from: https://github.com/rackodo/chat-bubbles-for-yt

The main repo, live preview website don't working anymore so i clone to my github create the github action for deploy long live website

I think this never go down, if github page still live

## Special thanks to

[Wahyudi](https://github.com/halowahyudi): Customisable chat bubble timeout

[Bash Elliott](https://github.com/rackodo): Customisable chat bubble colour

## issue

![image](https://github.com/licitfree/chat-bubbles-for-youtube/assets/40050527/da7f8c8c-ecbc-49af-bad7-02b7b15fea8e)

For firefox user need to disable that, to able to type

I don't know the really reason is, maybe about privacy stuff

work best on chromium base btw, you can download the min browser for minimal ui 

## TO-DO

- [x] feat: add keyboard sound option (cuz not all users have great sound keyboard and mic)
-> Solution: https://github.com/hainguyents13/mechvibes

## Branch strategy

To keep this repo maintainable, use a lightweight trunk-based workflow:

- **Protected branch**: `main` (or `master` in legacy repos) should be the default branch and protected.
- **Working branch**: short-lived branches like `feature/*`, `fix/*`, `chore/*` are created from default branch.
- **Merge policy**: prefer small, frequent PRs; delete merged branches after PR completion.
- **Release**: tag releases from default branch (`vX.Y.Z`). If hotfix is needed, create `hotfix/*` from latest tag and merge back.

Branch cleanup checklist:

1. Confirm branches to keep: at minimum keep `main/master` and the active development branch.
2. Delete merged local branches first.
3. Delete corresponding remote branches.
4. If default branch must change, switch default in hosting platform first, then delete old default branch.
