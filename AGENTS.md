<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the portfolio as a section-based single-page experience, with reusable site sections under `src/components/site`; this preserves focused navigation and isolated presentation logic.
- Keep the circular portrait and automation-tool surround in a dedicated site component using the existing ProfilePhoto resolver; this isolates presentation without changing photo delivery.
- Adapt reference copy using only Taha's existing supported details; do not import another portfolio's client counts, experience or performance claims.
- Scroll text and section reveals replay on viewport re-entry, while counters remain one-shot; this keeps motion noticeable without restarting numeric results.
- Cap word-reveal staggering in the shared text effect so long paragraphs become readable promptly; motion timing must not delay content access.
- Render the first screen without a blocking preloader or decorative glow layers; this keeps entrance animations visible and the presentation restrained.
- Resolve the profile asset pointer against its verified public asset host rather than the deployment origin; this keeps the portrait independent of published-site asset proxy availability.
- Import generated automation imagery into the existing About section; illustrative images stay separate from actual project evidence.
- Theme colors live only in semantic tokens: the default `:root` (bright "day") and `[data-theme="night"]` in `src/styles.css`, switched via `data-theme` on `<html>` (use `setAttribute`/`getAttribute`, not `dataset`, for TS index-signature rules); components never hardcode colors — this keeps both schemes consistent and dark-mode safe.
