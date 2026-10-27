# Collect project evidence for my interview dashboard

Open a Codex chat in the relevant project folder and paste the prompt below. Run it once for NoteEchoes, once for Agentic RAG Codebase Assistant, and once for MFlash. Bring each resulting report back to my interview-preparation chat.

## Copy this prompt

Inspect this repository in read-only mode and prepare an evidence-based technical interview briefing. Follow repository instructions. Do not edit source, install dependencies, run training, invoke paid services, or expose secrets, personal data, private document content, or credentials. Existing tests may be run only if safe and lightweight; label anything not run as unverified.

First identify which project this is. Separate all findings into: verified in code, documented but not verified, reasonable inference, and unknown. Do not invent metrics, infrastructure, production usage, design intent, or my personal ownership. Cite repository-relative files and line numbers for important claims. Distinguish implemented code from dead code, experiments, TODOs, and documentation promises.

Return a Markdown report in your reply with:
1. A plain-English project summary and user problem.
2. The architecture and an end-to-end trace of one request, including inputs, transformations, storage, model/tool calls, and outputs.
3. Exact models, versions, dependencies, execution locations, and deployment evidence. Separate model training from inference; distinguish local and remote processing.
4. Data preparation: sources, cleaning, labels, splits, leakage controls, dataset size, and privacy handling. Mark missing evidence explicitly.
5. Training configuration if present: model size, quantization, LoRA/QLoRA settings, target modules, rank, alpha, dropout, learning rate, batch size, epochs, hardware, loss and checkpoint choice. Report actual evidence only.
6. Retrieval if present: parsing, chunking, embedding, indexing, filters, ranking, reranking, citations, updating/deleting stale data, and access controls.
7. Evaluation: metric definitions, denominators, test-set origin, baseline comparisons, actual results, failure slices, and whether reported numbers can be reproduced. Do not treat schema validity as semantic accuracy.
8. Reliability: retries, idempotency, persistence, cancellation, recovery, authorization, logging, and failure behavior.
9. Three concrete failure scenarios grounded in code, and what the implementation does for each. Do not invent historical incidents.
10. Main engineering tradeoffs. Separate documented choices from recommendations you would make now.
11. Ten difficult interviewer questions with concise answers grounded in the repository. Label recommendations as hypothetical; do not present them as features I built.
12. A 60–90 second project explanation containing only substantiated facts, plus five questions I must answer about personal ownership, actual usage, and undocumented decisions.
13. A compact fact table: claim | evidence | confidence | remaining question.

Project-specific focus:
- NoteEchoes: Qwen3 model/runtime location; QLoRA training; what “96.3% action-field exact match” means; the 1,080 synthetic evaluation cases; train/test isolation; multilingual behavior; OCR; knowledge graph; SQLite persistence and recovery; TestFlight evidence; local-first versus remote operations.
- Agentic RAG Codebase Assistant: actual LangGraph states/edges and agent roles; Claude calls; Pinecone indexing; asynchronous retrieval; stopping conditions and maximum retries for self-correcting search; Ragas configuration and real evaluation results; security and stale code handling.
- MFlash: 74 action templates; classifier versus MPNet dual encoder responsibilities; contrastive objective and hard-negative construction; observation-bound arguments; typed adapters; authorization; cancellation; SHA-256 checks; journaling; idempotent retries; stale-state rejection; collision-safe undo; crash windows between filesystem and database writes.

Keep the report useful for an interview, not a file-by-file inventory. Finish with the most important unknowns. If the repository is missing training or evaluation artifacts, say so rather than guessing.
