# Interview answers — study guide

All answers are visible on the website. Start with your introduction, then the Orchestra tax-document project. Tuning recommendations are distinct from confirmed experience.


# Round 1

## Explain your Bank of America work

**Question:** Walk me through the tax-document extraction system you built.

**Answer:** At Bank of America, I work on a tax-document field-extraction workflow using Orchestra, the bank’s internal tool. The workflow processes tax-related documents and extracts required fields such as workflow IDs, dates, vendor names, and amounts into a structured result for validation and downstream use. My work spans data preparation, extraction, validation, APIs, and the review UI. Orchestra is the internal platform; I would verify its underlying model and supported adaptation methods before naming a specific training technique.

**Remember:** Tax documents → Orchestra → structured fields → validation

**Follow-up:** Why use OCR if the inputs were digital PDFs?

**Reply:** Digital PDFs may contain embedded images or unreliable text. I would extract native text first and use OCR only where needed.

**Context:** User correction: the bank workflow uses the internal tool Orchestra, not Qwen3. Previously supplied inputs, field examples, and ownership inform this summary. The underlying model, training interface, and historical fine-tuning method have not been confirmed.

## Why an LLM at all?

**Question:** Why use AI through Orchestra instead of only rules or a spreadsheet parser?

**Answer:** I would parse reliable spreadsheet columns and native PDF text directly first. AI-assisted extraction through Orchestra can help map varied tax-document layouts and labels to a consistent set of required fields. I would compare it with a rules-based baseline on representative held-out documents, measuring field accuracy, reviewer effort, latency, and cost. Whether Orchestra exposes an LLM or another extraction model must be verified.

**Remember:** Parse first → model ambiguity → measure value

**Follow-up:** If the spreadsheet already has a vendor column, why send it to an LLM?

**Reply:** If a vendor column is reliable, I would read it directly. Sending it through a model adds cost and another opportunity for error.

**Context:** Recommended explanation for the user-confirmed Orchestra workflow. Orchestra is a tool/platform name, not evidence of a particular model family.

## Which fine-tuning fits tax-field extraction?

**Question:** For tax-document field extraction through Orchestra, which fine-tuning approach would you choose?

**Answer:** I would start with supervised fine-tuning, or SFT, if Orchestra supports model adaptation and a prompted baseline still makes recurring extraction errors. The training examples pair a tax document or its extracted content with a human-verified structured answer containing the required fields. SFT teaches the input-to-output task. If the underlying model supports adapters, LoRA is a practical way to perform SFT with fewer trainable parameters; QLoRA is an option when supported quantization is needed to reduce base-weight memory. The platform’s actual capabilities determine which method is available.

**Remember:** SFT = learning task → LoRA = update method → Orchestra support

**Follow-up:** Can you fine-tune Orchestra itself with LoRA?

**Reply:** Orchestra is the internal tool. LoRA would adapt a compatible underlying model, if the platform exposes that capability. If it only offers an inference API, I would use its supported managed tuning option or improve prompts, document parsing, and validation.

**Context:** Recommended future approach, not a claim about a completed training run. User confirmed Orchestra and tax-field extraction; base model, access to weights, tuning support, and prior recipe are unknown.

## Valid JSON. Wrong money.

**Question:** The output is valid JSON, but the amount belongs to the wrong vendor. What now?

**Answer:** Valid JSON only proves structure. I would trace each amount back to its source, check its vendor and currency, and distinguish totals from subtotals and tax. Conflicting evidence goes to review. Then I would locate the error in parsing, extraction, or mapping and add that case to the regression set.

**Remember:** Structure ≠ correctness → evidence → regression

**Follow-up:** The model says it is 99% confident. Can it auto-approve?

**Reply:** No. A model’s self-reported confidence is not a calibrated probability. Any automatic approval threshold needs validation against labeled outcomes.

**Context:** Recommended design. This is a hypothetical failure scenario, not an incident you said occurred.

## The metric cross-examination

**Question:** How would you defend the estimated 50–60% manual-effort reduction?

**Answer:** The 50–60% figure on my résumé is an estimate, not a controlled benchmark. To substantiate it, I would compare total human handling time before and after, including review, corrections, and exceptions, across comparable documents. Faster extraction only matters if the complete workflow takes less effort without sacrificing quality.

**Remember:** Estimate → total handling time → quality

**Follow-up:** Did time saved in extraction just move to reviewers?

**Reply:** Then the measurement is incomplete. I would include reviewer time and compare the full workflow, not just extraction.

**Context:** Do not invent sample size, baseline minutes, or a measured causal result. Verify the original basis before quoting the number as proven.

## The duplicate-delivery incident

**Question:** The API accepted your result, but your job timed out. Is retrying safe?

**Answer:** A timeout does not mean the write failed. I would give each delivery a stable idempotency key, enforce it atomically at the destination, and persist delivery status. On an ambiguous timeout, I would reconcile before retrying. That prevents a successful delivery from becoming a duplicate.

**Remember:** Timeout ≠ failure → stable key → atomic write

**Follow-up:** Two workers both check for the same key. What stops the race?

**Reply:** A database uniqueness constraint or atomic conditional write. A separate existence check followed by an insert is vulnerable to races.

**Context:** Recommended approach; not a claim that a specific destination or API supported this in your implementation.

## MCP is not a quality metric

**Question:** You used MCP retrieval. How does that make answers accurate?

**Answer:** MCP provides a way to expose retrieval; it does not guarantee answer quality. I would check that retrieval returns authorized, current evidence and that the answer actually follows it. If evidence is missing or conflicting, the system should clarify or abstain. I would evaluate retrieval and generation separately.

**Remember:** Access → evidence → supported answer

**Follow-up:** Can a grounded answer still be wrong?

**Reply:** Yes. An answer can faithfully repeat an outdated source. Grounding establishes support, not necessarily truth.

**Context:** Your résumé establishes MCP-based retrieval. Exact indexing, access controls and evaluation implementation are not yet supplied.

## The architecture whiteboard

**Question:** Design the tax-document pipeline for bursts, review, and safe reprocessing.

**Answer:** I would separate ingestion, parsing, Orchestra-based extraction, validation, review, and delivery. A durable queue absorbs bursts; versioned inputs, prompts, and outputs support replay; idempotent delivery prevents duplicates. I would monitor field errors, review rate, queue age, latency, and cost. Before sizing workers or discussing training infrastructure, I would establish document volumes, service limits, and what Orchestra actually provides.

**Remember:** Queue → validate → version → replay

**Follow-up:** How do you reprocess a document without overwriting an approved correction?

**Reply:** I would preserve the approved correction as a separate authoritative version, then stage reprocessed output for comparison rather than silently overwriting it.

**Context:** Recommended architecture. Do not describe queue technology, deployment topology or throughput as historical facts.

## The synthetic benchmark trap

**Question:** What does 96.3% action-field exact match on 1,080 synthetic cases actually prove?

**Answer:** The 96.3% result is 1,040 of 1,080 synthetic action cases matching seven selected fields, with the operational checks also passing. It is not full-response or real-user accuracy. The report also found normalized template overlap with training, so I treat it as a regression benchmark. My next step would be an independently written holdout and a matched base-model comparison.

**Remember:** 1,040/1,080 → selected fields → template limitation

**Follow-up:** Would you accept that error rate for destructive actions?

**Reply:** No. For destructive actions, accuracy alone is insufficient; execution also needs authorization, state checks, and a safe failure path.

**Context:** Supplied NoteEchoes report: saved outputs were rescored, inference was not rerun. Selected fields: intent, mode, items, entities, draft, requires_confirmation, proposed_tool. No established improvement over stock Qwen.

## The retrieval autopsy

**Question:** Your codebase assistant cites code but gives the wrong answer. How do you debug it?

**Answer:** I would debug retrieval before changing the prompt. First, check whether the correct repository version and relevant code reached the model. Then inspect chunk boundaries, ranking, missing dependencies, and whether the answer follows the evidence. I would evaluate retrieval and generation separately and turn the failure into a regression case.

**Remember:** Find evidence → inspect ranking → verify answer

**Follow-up:** What stops self-correcting search from looping forever?

**Reply:** A fixed search-step budget, a time budget, and a stop condition when evidence no longer improves. Without enough evidence, return a qualified answer or ask for clarification.

**Context:** Proposed RAG design. Your résumé establishes LangGraph, Claude, Pinecone, asynchronous retrieval and Ragas; exact graph, metrics and operational behavior remain unverified.

## Crash between two worlds

**Question:** A file moved, but the database journal still says pending. Recover safely.

**Answer:** The file system and SQLite are not one atomic transaction. In MFlash’s safer move path, a prepared journal record comes first, then the file operation and verification, then commitment. Recovery checks actual file contents before restoring or finalizing. If the original path is occupied, undo uses a collision-safe alternative instead of overwriting newer data.

**Remember:** Prepared record → verify bytes → safe undo

**Follow-up:** Why is SQLite WAL not sufficient by itself?

**Reply:** WAL protects database consistency. It does not make an external file operation part of the same transaction, so crash windows still need reconciliation.

**Context:** Based on supplied MFlash code-review report. The safer move path uses a destination hard link, verification, source unlink and database update. This is recoverable evidence, not a global exactly-once guarantee.

## The skewed Spark job

**Question:** A 5 TB/day pipeline slows down. One key owns 40% of the records. What do you do?

**Answer:** I would inspect the execution plan, task durations, shuffle, spill, and partition sizes first. A key containing 40% of records can overload one partition even after adding workers. Depending on the operation, I would consider pre-aggregation, a separate hot-key path, or carefully designed salting, then verify correctness and compare runtime and cost.

**Remember:** Measure → locate skew → validate fix

**Follow-up:** How can salting accidentally duplicate results?

**Reply:** If the join sides are replicated or salted inconsistently, matching rows can be multiplied or lost. I would verify key-level cardinality and aggregates.

**Context:** Recommended diagnosis for a hypothetical incident; do not imply this was a specific Sedin production failure.

## Explain NoteEchoes

**Question:** Tell me about NoteEchoes in under a minute.

**Answer:** I built NoteEchoes to turn spoken thoughts and imported documents into organized, searchable notes. It combines Flutter and Swift with a specialized Qwen3-0.6B model running locally through MLX. The key design is saving the note before AI enhancement, then validating the result and rejecting it if the user has edited the note. That keeps capture useful even when generation fails.

**Remember:** Capture → local Qwen → save before AI

**Follow-up:** Is every part of the app offline?

**Reply:** No. Core inference and storage are local, but model downloads, optional web lookup and feedback, and some speech fallback paths can use the network.

**Context:** Project implementation is supported by the supplied report; personal ownership comes from your résumé. Current TestFlight status, user adoption and device performance were not verified.

## Why such a small model?

**Question:** Why Qwen3-0.6B for NoteEchoes?

**Answer:** The task is constrained intent and action interpretation, which makes a small specialized model a reasonable fit for an iPhone. The implementation uses Qwen3-0.6B with structured validation, while document answers use cited excerpts. I would justify the final model choice with device latency, memory, and task-quality measurements rather than parameter count alone.

**Remember:** Constrained task → device fit → measure

**Follow-up:** How much faster is it than a larger model?

**Reply:** I do not have a verified comparative device benchmark. I would measure cold start, warm latency, memory and battery under the same workload.

**Context:** The report confirms Qwen3-0.6B and local MLX configuration. Device benchmark results and the original model-selection rationale are unknown. Rationale here is a design explanation, not measured evidence.

## Explain your fine-tuning

**Question:** How is the NoteEchoes model adapted?

**Answer:** The training pipeline adapts pretrained Qwen3-0.6B with QLoRA and rsLoRA. It keeps the base in four-bit NF4 and trains adapters on the expected completions, with prompt tokens masked from the loss. Deployment is a separate eight-bit MLX artifact. The distinction is important: training quantization and inference quantization are different stages.

**Remember:** Pretrained base → completion loss → separate deployment

**Follow-up:** What are the adapter settings?

**Reply:** The inspected initial configuration uses rank 32, alpha 64, and dropout 0.05, targeting attention and MLP projections. I would check the run artifacts before saying those settings produced the deployed checkpoint.

**Context:** Supplied report confirms configuration, not a complete training-to-shipped-weights chain. Initial learning rate 4e-5; one epoch; sequence length 1,024. No established contribution from the experimental GRPO code.

## A user edits during generation

**Question:** What happens if AI finishes after the user edits a note?

**Answer:** The note is saved first. Before enhancement starts, the service records a fingerprint; before applying the result, it checks the current note against that snapshot. If the user edited or deleted it, the AI result is discarded. The user’s newer state takes precedence over delayed generation.

**Remember:** Save → fingerprint → reject stale output

**Follow-up:** Does a timeout stop the underlying model?

**Reply:** Not necessarily. A timeout can stop waiting without stopping native computation. The stale-result checks still matter even after the UI has moved on.

**Context:** Report describes inspected implementation and tests, but those application tests and device behavior were not executed in the review.

## Explain hybrid retrieval

**Question:** How does NoteEchoes find the right note?

**Answer:** It combines SQLite full-text search with optional multilingual E5 embeddings and merges their rankings using reciprocal rank fusion. Lexical search catches exact terms; semantic search catches related meaning. The active conversation and PDF paths return cited excerpts. That keeps the answer tied to the stored material rather than asking the action model to improvise document answers.

**Remember:** Exact terms + meaning → rank fusion → excerpts

**Follow-up:** Is the knowledge graph a reasoning engine?

**Reply:** It organizes related notes into topics and displays topic membership. I would describe it as a note-and-topic graph, not an entity-reasoning engine.

**Context:** Report: FTS5/BM25; multilingual-e5-small, 384 dimensions; RRF 1/(60+rank); up to 15 candidates per retrieval branch, six final by default. No learned reranker in this path; quality metrics unverified.

## What would you improve?

**Question:** What is the biggest weakness in NoteEchoes today?

**Answer:** The biggest evaluation gap is generalization. The synthetic score is useful for regressions, but normalized templates overlap with training and there is no completed matched base-model comparison. I would first build an independent real-language holdout, then measure device performance and strengthen failed-document retry handling.

**Remember:** Known gap → independent evaluation → recovery

**Follow-up:** What is the failed-document issue?

**Reply:** The review found that a failed PDF can be recognized by its existing hash and returned without checking completion. I would make deduplication status-aware so failed ingestion can be retried safely.

**Context:** The failed-PDF case is inferred from inspected code, not a reproduced or personally reported historical incident. Proposed improvements are not completed features.

## Explain MFlash

**Question:** What makes MFlash an engineering project rather than a model demo?

**Answer:** I built MFlash as a macOS assistant for local document retrieval and scoped file operations. It separates action suggestions from execution policy: supported actions pass through argument, authorization, and state checks before execution. The file paths include hashes, retry receipts, journaling, and collision-safe undo. The strongest part is controlling what happens around a model decision, not just generating the decision.

**Remember:** Local assistant → execution boundary → recovery

**Follow-up:** Is it a production-ready computer-use agent?

**Reply:** It is a design preview with supported workflows and experimental visual paths. I would demonstrate specific tested operations rather than claim general autonomous reliability.

**Context:** Supplied MFlash report. Personal project ownership is résumé-based; the code review itself cannot establish authorship or adoption. Ordinary scheduler policy and explicit workbench approval are distinct.

## Why two decision models?

**Question:** How do the classifier and MPNet ranker differ?

**Answer:** The classifier maps request and observation features to an action template. The MPNet ranker compares a state with supplied candidate actions using learned projection heads. One selects a structured pattern; the other ranks alternatives. Neither model’s score grants permission to execute—the execution layer makes that decision separately.

**Remember:** Template selection → candidate ranking → separate authority

**Follow-up:** Are 74 templates the same as 74 tools?

**Reply:** No. That is the template count from a historical training run. Templates include argument-binding patterns, so it is not a count of independent tools or universal capabilities.

**Context:** Report: random-initialized MLP classifier; frozen all-mpnet-base-v2 backbone with distinct state/action projection heads. The 74 count is data-derived and historical.

## Defend the perfect ranker score

**Question:** Your ranker got 100%. Why is that not enough?

**Answer:** The recorded score is 1,381 out of 1,381 development candidate sets. The correct action was already supplied among the choices. That measures ranking, not discovering actions, understanding the screen, executing safely, or completing a workflow. I would validate real task completion separately before making an automation reliability claim.

**Remember:** Development candidates → narrow metric → task success

**Follow-up:** Were the negative examples mined online?

**Reply:** The inspected data generators use authored alternatives and sampled distractors. Online hard-negative mining and their measured difficulty were not established.

**Context:** The score is from a saved report and was not rerun. Do not call it a fresh held-out test or 100% automation accuracy.

## Why contrastive learning?

**Question:** Explain the ranking objective without jargon.

**Answer:** The ranker learns to score the correct action above plausible alternatives for the same state. MPNet supplies text representations; trainable projection heads learn how state and action representations should align. The loss penalizes competing negatives that score too highly. This trains selection among candidates rather than free-form action generation.

**Remember:** Correct action > alternatives → learned alignment

**Follow-up:** Did you use in-batch negatives?

**Reply:** There are two recipes: one mixes hard-negative and symmetric in-batch losses, while another compares each example with its own negatives. I would identify the checkpoint’s recipe before attributing either to it.

**Context:** Report records two distinct training scripts. Which full recipe produced the current root checkpoint is unknown.

## Changed file after approval

**Question:** What if the source file changes after a workbench preview?

**Answer:** The workbench captures a source digest and checks the action against the trusted grant before execution. It recomputes the digest and rejects a changed source. If an earlier attempt is still pending, it requires review instead of blindly retrying. Approval applies to the reviewed operation and state, not whatever happens to exist later.

**Remember:** Preview digest → grant match → reject changes

**Follow-up:** What evidence do you have that this works?

**Reply:** The supplied review ran 12 isolated executor tests covering cases such as retries, cancellation, collisions, and changed sources. That supports those tested paths, not all production workflows.

**Context:** Test result is reported by the supplied briefing, not rerun in this interview-dashboard task. External-process races are not fully covered by the executor guarantees.

## Explain your RAG assistant

**Question:** Give me a concise overview of the codebase assistant.

**Answer:** I built a codebase assistant using LangGraph, Claude, Pinecone, and FastAPI, with asynchronous retrieval and self-correcting search. The aim was to answer developer questions using repository evidence. The key engineering issue is separating missing evidence from poor generation: a better prompt cannot recover code that retrieval never found.

**Remember:** Developer questions → repository evidence → diagnose retrieval

**Follow-up:** What did the evaluation prove?

**Reply:** My résumé lists Ragas evaluation, but I do not have the run results here. I would discuss the evaluation dimensions without inventing an improvement percentage.

**Context:** Opening uses résumé claims. No repository briefing was supplied for this project; exact agent roles, embeddings, chunking and results remain unverified.

## Design the graph

**Question:** What would a sensible LangGraph workflow look like?

**Answer:** I would use a small, explicit workflow: understand the question, retrieve code, inspect evidence gaps, then answer with source references. If evidence is weak, rewrite the query and retry within a strict budget. I would track retrieved files, repository version, and attempted queries in state so retries add information instead of repeating the same search.

**Remember:** Question → retrieve → inspect → answer

**Follow-up:** Why not use more agents?

**Reply:** Every extra agent adds latency, cost, and coordination failure modes. I would add one only when a controlled evaluation shows that its responsibility improves the result.

**Context:** Proposed design for the résumé project, not a recovered description of its actual graph. No fabricated production outcomes.

## Chunking and freshness

**Question:** How would you index a changing codebase?

**Answer:** I would chunk around functions and classes where possible, preserve file paths and symbols, and attach a repository revision to every chunk. Changes should trigger targeted reindexing and removal of deleted code. At query time, I would combine exact symbol lookup with semantic retrieval and include enough surrounding context to understand dependencies.

**Remember:** Symbol boundaries → revision metadata → targeted updates

**Follow-up:** Would you always use a reranker?

**Reply:** No. I would add one only if ranking errors justify its latency and cost on representative queries.

**Context:** Recommended indexing approach; parser, embedding model, chunk sizes, incremental indexing and reranking are not confirmed implementation details.

## Tell me about yourself

**Question:** Give me your introduction in 45 seconds.

**Answer:** I’m an AI engineer with a foundation in data engineering. At Bank of America, I work on tax-document field extraction using Orchestra, the bank’s internal tool, alongside retrieval workflows, owning work from data preparation through APIs and user review. Earlier, I worked on Spark and Databricks pipelines at Sedin. My projects extend that experience into local AI and controlled automation. The common thread is turning model outputs into systems people can actually use.

**Remember:** AI role → data foundation → usable systems

**Follow-up:** Why are you targeting AI engineering?

**Reply:** I enjoy the boundary between models and software: choosing the task, preparing the data, evaluating behavior, and building reliable execution around it. My experience spans that full path.

**Context:** Résumé and supplied project reports. No new metrics, employers, responsibilities, or adoption claims introduced.

## Your contribution at Sedin

**Question:** What did you do at Sedin Technologies?

**Answer:** At Sedin, I worked on Databricks ETL and ELT pipelines using Spark, PySpark, Python, and SQL, processing over 5 TB of transactional data daily. I also developed backend services and NLP summarization pipelines. That experience gave me the data-processing foundation I now bring to AI workflows: transforming inputs, integrating services, and evaluating outputs.

**Remember:** 5 TB/day → Spark pipelines → AI foundation

**Follow-up:** Was 5 TB your personal throughput improvement?

**Reply:** No. It describes the processing scale stated on my résumé, not an improvement percentage or an individual benchmark. I would explain my specific pipeline contribution separately.

**Context:** Résumé-backed. Source formats, cluster size, scheduling, table design and actual incidents have not been supplied.

## Your Cactus Club project

**Question:** Describe the file-sharing application you built.

**Answer:** At Cactus Club, I built an internal React file-sharing application for about 200 users, supporting files up to 10 MB. It used Cognito authentication, encrypted S3 storage, and DynamoDB for sharing history and audit metadata. I also implemented key-pair generation and recipient-only decryption, connecting the user experience with access and data protection.

**Remember:** User need → storage/access → recipient decryption

**Follow-up:** Does encrypted S3 storage mean only the recipient can decrypt?

**Reply:** No. Storage encryption and recipient-only decryption are separate protections. I would explain the key ownership and client decryption flow from the implementation before claiming end-to-end guarantees.

**Context:** Résumé-backed. Cryptographic algorithms, private-key storage, recovery and threat-model details are not supplied.

## Explain your summarization work

**Question:** How did your earlier NLP summarization pipeline work?

**Answer:** At Sedin, I worked on extractive summarization using TF-IDF, PageRank, and PySpark, with ROUGE for evaluation. The approach selects important source sentences instead of generating new ones. The tradeoff is easier source traceability, but sentence selection can still lose context or produce a disjointed summary.

**Remember:** Extractive → source sentences → quality tradeoff

**Follow-up:** Does a high ROUGE score prove a good summary?

**Reply:** No. ROUGE measures overlap with reference text. I would also assess coverage, redundancy, coherence, and whether the summary preserves the source’s meaning.

**Context:** Résumé confirms the named methods. Exact graph construction, preprocessing and measured ROUGE results remain unknown.

## Lead with ownership

**Question:** What does end-to-end ownership mean in your Bank of America role?

**Answer:** I worked directly with clients to understand the extraction requirements, prepared training data, integrated the model into the processing workflow, and built validation, APIs, and the review UI. That meant connecting the requested fields to a usable downstream output and keeping the review process part of the product—not treating the model as the whole solution.

**Remember:** Requirements → implementation → usable delivery

**Follow-up:** How did you prioritize requirements?

**Reply:** I would prioritize critical fields and failure consequences first, define acceptance examples with stakeholders, and separate must-have correctness from convenience features.

**Context:** Ownership is user-confirmed and résumé-supported. Prioritization answer is a recommended method, not a supplied historical process.

## A credible weakness answer

**Question:** What would you improve in one of your projects?

**Answer:** For NoteEchoes, I would strengthen the evaluation before adding more model complexity. The existing synthetic benchmark catches regressions, but template overlap limits what it says about unfamiliar requests. I would add an independent human-authored holdout, compare against the base model under matched settings, and measure actual device performance.

**Remember:** Specific gap → concrete plan → measurable outcome

**Follow-up:** Would you remove the 96.3% result?

**Reply:** I would keep it only with its exact scope: selected action fields on synthetic cases. I would not present it as general real-world accuracy.

**Context:** Grounded in the supplied NoteEchoes review. These are proposed improvements, not completed work.

## Prepare tax-document training examples

**Question:** What would the training data for Orchestra-supported extraction look like?

**Answer:** Each example would contain a tax document’s content, a consistent extraction instruction and schema, and the correct structured fields verified by a reviewer. For example, a document stating “Vendor: Example Co; Amount: 125.00 USD” could map to {"vendor": "Example Co", "amount": "125.00", "currency": "USD"}. I would include missing fields, repeated entities, multiple dates, tables, poor scans, and corrected mistakes. Absent evidence maps to an explicit missing value. All data preparation and training would stay in the bank-approved environment.

**Remember:** Document + schema → verified fields → difficult cases

**Follow-up:** Would you create a separate training example for every tax value?

**Reply:** The goal is to learn extraction behavior, not memorize particular documents. Examples should cover varied structures and field relationships; evaluation must test new documents and templates.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.

## Evaluate a tax-extraction fine-tune

**Question:** How would you decide whether fine-tuning improves the Orchestra workflow?

**Answer:** I would compare direct parsing, a prompted baseline, and the tuned candidate on the same held-out documents. I would split by document family or template and check duplicates to reduce leakage. Metrics include per-field exact match with agreed normalization, precision and recall for present fields, missing-field handling, whole-record correctness, vendor-amount association, schema validity, and review effort. I would report failures by document type and choose a candidate only if it improves the required quality without unacceptable latency or cost.

**Remember:** Independent holdout → baseline comparison → field and workflow quality

**Follow-up:** Training loss drops. Is that sufficient?

**Reply:** No. Lower token loss can reflect better formatting while important fields remain wrong. Selection needs held-out extraction and workflow metrics, with extra attention to high-impact errors such as incorrect amounts.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.

## SFT, LoRA, QLoRA: what changes?

**Question:** How do SFT, LoRA, and QLoRA relate, and would you use DPO or continued pretraining?

**Answer:** SFT is training on correct example responses. LoRA changes a model through small adapter matrices while freezing the base weights. QLoRA combines adapter training with a quantized frozen base to reduce memory used by base weights. You can therefore perform SFT using LoRA or QLoRA; they are not competing task objectives. For field extraction, labeled correct outputs are a direct starting point. Preference optimization such as DPO targets preference comparisons, while continued pretraining learns from domain text; neither replaces task-specific extraction examples or evaluation.

**Remember:** Objective: SFT → parameters: LoRA → memory: QLoRA

**Follow-up:** Is QLoRA automatically best for every bank system?

**Reply:** No. Model compatibility, bank policy, hardware, precision requirements, managed platform support, and measured extraction quality determine the choice. I would not assume Orchestra exposes adapter training.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.


# Round 2

## Fine-tuning, RAG, or prompting?

**Question:** A new document workflow performs poorly. How do you choose between prompting, RAG, and fine-tuning?

**Answer:** I would first classify the failure. Missing external knowledge points toward retrieval. Inconsistent behavior or output mapping may justify fine-tuning after a strong prompt baseline. Format failures may need constrained output and validation. I would compare the simplest viable approaches on the same held-out examples, using task accuracy, latency, cost, and review effort.

**Remember:** Diagnose → baseline → compare

**Follow-up:** Can fine-tuning keep enterprise knowledge current?

**Reply:** It can encode information, but frequent factual updates are usually easier to manage through retrieval. Fine-tuning is not a dependable database of current facts.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Explain LoRA mathematically

**Question:** What does LoRA actually train, and what does rank control?

**Answer:** LoRA freezes a weight matrix W and learns an update expressed as the product of two smaller matrices: delta W equals B times A. Rank controls the size of that update space and the number of trainable parameters. Higher rank gives more capacity but also increases memory and overfitting risk. I would choose it using held-out task performance.

**Remember:** Frozen W → B×A → capacity tradeoff

**Follow-up:** Is doubling rank guaranteed to improve quality?

**Reply:** No. More parameters cannot fix poor labels or leakage. I would compare ranks with the same data, evaluation protocol, and realistic compute budget.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## What QLoRA saves

**Question:** Does four-bit QLoRA mean the entire training process uses four-bit memory?

**Answer:** No. QLoRA stores the frozen base weights in a quantized representation and trains adapters. Computation, activations, adapter parameters, gradients, and optimizer state still require memory at other precisions. The saving is substantial for base weights, but sequence length and activation storage can still make a training run run out of memory.

**Remember:** Quantized weights → train adapters → activation budget

**Follow-up:** What would you change first if training runs out of memory?

**Reply:** I would inspect memory usage, then reduce sequence length or microbatch size, consider gradient checkpointing, and recover the desired effective batch through accumulation where appropriate.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Loss versus task success

**Question:** Why can training loss fall while document extraction gets worse?

**Answer:** Token-level loss averages prediction quality across the target sequence. It may improve on common formatting while rare critical fields get worse. I would track held-out field exact match, missing-field handling, schema validity, and error severity alongside loss. A lower loss is useful evidence, but the checkpoint must meet the actual extraction objective.

**Remember:** Token objective → field objective → checkpoint

**Follow-up:** Why mask prompt tokens in completion-only training?

**Reply:** The loss then focuses on predicting the response rather than reproducing the prompt. The prompt still provides context to the model.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Detect overfitting and leakage

**Question:** Your training score rises sharply. What convinces you the model actually improved?

**Answer:** I would compare training and validation behavior on data separated by document family, source, or user scenario, then audit near duplicates and shared templates. I would inspect per-class and difficult-case results, not just the average. Final selection should use validation data; a genuinely held-out test should be reserved for the final assessment.

**Remember:** Independent split → failure slices → untouched test

**Follow-up:** What if the same template has different IDs in train and test?

**Reply:** The rows are different, but the language pattern may be effectively shared. I would normalize identifiers and test on new template families before claiming generalization.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Tokenization and truncation

**Question:** Why does tokenization matter for your tax-document extraction pipeline?

**Answer:** Tokenization determines how much source text fits and how fields are represented. Long tables, identifiers, and multilingual text can consume tokens differently. I would inspect token counts, preserve relevant headers and rows, and avoid silently truncating the evidence needed for a field. Chunking should retain enough context to associate amounts with the correct entity.

**Remember:** Token budget → field context → no silent truncation

**Follow-up:** Would you just truncate the last half of the document?

**Reply:** No. Important fields may appear near the end. I would select relevant sections or process bounded sections and reconcile their evidence.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Attention and KV cache

**Question:** Explain attention and why long contexts make inference expensive.

**Answer:** Attention compares queries with keys to weight the value representations a token uses. Standard full attention has quadratic score computation in sequence length during prefill. During autoregressive generation, a KV cache reuses prior keys and values, reducing repeated work while consuming memory. Longer prompts therefore affect prefill latency, generation cost, and concurrent capacity.

**Remember:** Queries/keys/values → prefill → cached decoding

**Follow-up:** Does a KV cache make long context free?

**Reply:** No. The cache grows with context, layers, and key/value dimensions, and each new token still attends to the retained context. Optimized kernels change efficiency, not that basic tradeoff.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Class imbalance and abstention

**Question:** How would you evaluate a classifier with many rare action templates?

**Answer:** I would inspect per-class precision and recall, macro averages, a confusion matrix, and the cost of each mistake. A dominant class can hide poor rare-action performance in overall accuracy. I would tune an abstention policy on held-out data and report both accepted-action accuracy and coverage, especially for mutating operations.

**Remember:** Per-class metrics → risk → coverage

**Follow-up:** Can you get perfect accuracy by rejecting everything?

**Reply:** Accepted-case accuracy becomes uninformative if coverage is zero. I would report coverage, wrong accepted actions, and the total task-success rate together.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Choose chunk boundaries

**Question:** How would you choose chunk size for code retrieval?

**Answer:** I would start with function or class boundaries and preserve file paths, symbols, and nearby context. Small chunks improve focus but can lose dependencies; large chunks preserve context but dilute retrieval and consume the prompt budget. I would compare alternatives using representative questions, retrieval recall, answer correctness, and latency.

**Remember:** Code structure → context tradeoff → evaluate

**Follow-up:** Why not choose one fixed token count for every file?

**Reply:** Code structure and task scope vary. A token limit is a useful bound, but blindly cutting across a signature and its body can break the evidence.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Embedding model versus reranker

**Question:** What is the difference between an embedding retriever and a cross-encoder reranker?

**Answer:** An embedding retriever encodes queries and documents separately, which allows efficient search over precomputed document vectors. A cross-encoder examines a query and candidate together, often improving relevance judgments at greater per-pair cost. I would retrieve a manageable candidate set first and rerank only if the quality improvement justifies the latency.

**Remember:** Independent vectors → joint scoring → budget

**Follow-up:** Can a reranker recover a document the retriever never found?

**Reply:** No. It can reorder the candidate set. Missing evidence requires improving candidate recall or expanding retrieval.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Evaluate RAG properly

**Question:** Which metrics would you use to diagnose a RAG application?

**Answer:** I would evaluate retrieval recall and ranking quality separately from answer correctness and evidence support. Missing evidence suggests a retrieval issue; unsupported claims suggest a generation issue. I would also track abstentions, latency, and cost. Automated judges need calibration against human-reviewed examples, particularly when a metric will determine a release decision.

**Remember:** Retrieval → generation → human calibration

**Follow-up:** Is a high faithfulness score sufficient to ship?

**Reply:** No. A response can be faithful to an outdated source or fail to answer the question. Correctness, relevance, source quality, and operational behavior also matter.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Prompt injection in retrieved code

**Question:** A retrieved README tells the assistant to send secrets to an external URL. What prevents it?

**Answer:** I would treat retrieved text as untrusted evidence. Tool permissions and data access must be enforced outside the model, with scoped credentials, validated arguments, and explicit controls for consequential actions. Prompts can reinforce the boundary, but they are not the authorization mechanism. I would test malicious content embedded in documents and code comments.

**Remember:** Untrusted text → external policy → adversarial tests

**Follow-up:** Would removing the phrase “ignore previous instructions” solve it?

**Reply:** No. Attacks can be indirect or obfuscated. The system must remain safe even when the model follows a malicious suggestion.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Tenant isolation and stale access

**Question:** How would you prevent one user’s documents from appearing in another user’s answer?

**Answer:** I would derive authorization from the authenticated identity and enforce it during retrieval, source fetching, and tool execution. Cache keys must include the relevant access scope and content version. Revoked permissions should invalidate access even if embeddings remain indexed. I would test cross-tenant queries and attempts to bypass filters through direct document IDs.

**Remember:** Identity → enforced scope → cache invalidation

**Follow-up:** Can you trust a tenant ID passed in the user’s prompt?

**Reply:** No. The authorization scope must come from trusted server-side identity and policy, not model output or user-supplied text.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Spark: lazy execution and shuffle

**Question:** What happens between a PySpark transformation and an action?

**Answer:** Transformations build a logical computation rather than immediately processing every row. An action triggers execution, and Spark plans the work into stages and tasks. Operations requiring redistribution, such as many joins and aggregations, introduce shuffles. I would inspect the plan and runtime metrics because data movement often dominates the cost.

**Remember:** Plan → action → shuffle cost

**Follow-up:** Would caching every intermediate DataFrame help?

**Reply:** No. Caching consumes memory and can cause spill or eviction. I would cache reused expensive results only when measurements justify it.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Broadcast versus shuffle join

**Question:** When would you use a broadcast join?

**Answer:** When one side is small enough to fit comfortably on each executor, broadcasting it can avoid shuffling the large side. I would consider serialized size, executor memory, concurrency, and join semantics rather than row count alone. If both sides are large, I would inspect partitioning, skew, filtering, and the chosen distributed join strategy.

**Remember:** Small side → memory budget → inspect plan

**Follow-up:** What if the supposedly small side suddenly grows?

**Reply:** A forced broadcast can cause memory pressure or failure. I would keep statistics current, monitor size, and avoid hard-coded hints without an operating bound.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Partitioning and small files

**Question:** How would you partition a large transactional dataset?

**Answer:** I would choose columns that match common filters and have manageable cardinality, then measure pruning and file sizes. Partitioning every unique customer can create too many tiny files. I would balance query access patterns, write volume, and maintenance, with compaction where appropriate. Physical partitioning should be a workload decision.

**Remember:** Query filters → manageable cardinality → file sizes

**Follow-up:** Is repartition the same as coalesce?

**Reply:** Repartition generally shuffles to redistribute data and can increase or decrease partitions. Coalesce commonly reduces partitions with less movement, but may preserve imbalance.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Watermarks and late data

**Question:** What does a watermark do in a streaming pipeline?

**Answer:** A watermark uses observed event-time progress and an allowed delay to bound state and handle late records for supported stateful operations. It is not a guarantee that every older record will be discarded at one exact instant. I would define the business policy for very late data and provide a correction or reconciliation path.

**Remember:** Event time → bounded state → late-data policy

**Follow-up:** Does a watermark advance just because wall-clock time passes?

**Reply:** Generally it depends on event-time progress in the input. An idle or slow input can affect advancement, especially with multiple streams.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Exactly-once: scope the claim

**Question:** Does a Spark checkpoint guarantee exactly-once writes to an external API?

**Answer:** No. A checkpoint can support recovery of source progress and processing state, but external side effects depend on the sink’s commit and deduplication behavior. I would use a stable event or batch identity and an idempotent destination operation. The guarantee must cover the source, processing, and sink together.

**Remember:** Checkpoint → sink semantics → idempotency

**Follow-up:** What about foreachBatch?

**Reply:** It can replay a batch after a failure. I would make the sink operation duplicate-safe using a stable batch identity and a durable commit protocol appropriate to that sink.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Incremental loads and schema changes

**Question:** How would you design incremental ingestion that tolerates updates and schema drift?

**Answer:** I would prefer a reliable change feed or monotonic source position, preserve operation type and source ordering, and make merges replay-safe. A timestamp watermark needs overlap and reconciliation if updates can arrive late. I would validate schema changes against a contract, allow compatible additions, and quarantine incompatible records with enough context to repair them.

**Remember:** Change identity → replay-safe merge → schema contract

**Follow-up:** Can you simply select rows newer than the last timestamp?

**Reply:** Only if the source guarantees that ordering and completeness. Equal timestamps, late commits, updates and deletes can otherwise be missed.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Async, threads, and processes

**Question:** When would you use async def in a FastAPI endpoint?

**Answer:** For request paths that await nonblocking I/O, such as an async HTTP or database client. Calling blocking work inside async def can block the event loop. I would isolate CPU-heavy processing or model inference in an appropriate worker or serving system and bound concurrency so requests cannot overwhelm downstream capacity.

**Remember:** Await I/O → isolate blocking work → bound load

**Follow-up:** Does making an inference function async make it faster?

**Reply:** No. Declaring a function async does not parallelize its computation. Throughput depends on the execution backend, batching, scheduling, and resource limits.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Secure an extraction API

**Question:** What controls belong around your model extraction endpoint?

**Answer:** I would authenticate the caller, authorize access to the specific document, enforce size and format limits, and validate the output contract. Long jobs should use a durable job ID with status and idempotency. I would add request limits, deadlines, audit events, and careful log redaction so operational visibility does not expose document contents.

**Remember:** Identity → resource authorization → bounded jobs

**Follow-up:** Is a valid login enough to download any result?

**Reply:** No. Each job and result needs object-level authorization; knowing a job ID must not grant access.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Reliability tests that matter

**Question:** What would you test beyond a successful extraction example?

**Answer:** I would cover missing fields, ambiguous values, malformed files, duplicate requests, downstream timeouts, permission failures, and reprocessing. For model changes, I would use a frozen regression set with critical-field slices. For file operations, I would test state changes and crashes around side effects. Tests should target failure consequences, not merely mirror the code.

**Remember:** Bad input → partial failure → regression

**Follow-up:** Would you mock every external dependency?

**Reply:** Unit tests can use mocks, but contract and integration tests must verify real boundaries. Otherwise a mocked success can hide a broken protocol or incompatible response.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Deployment drift and rollback

**Question:** How do you detect a model that degrades after deployment?

**Answer:** I would monitor input changes, review and correction rates, and task-quality samples alongside latency and failures. Unlabeled drift is an alert, not proof of quality loss. I would version the model, prompt, schema, and evaluation set, roll out gradually, and retain a tested rollback path when measured quality or operational limits regress.

**Remember:** Observe → label → controlled rollout

**Follow-up:** Why not automatically retrain whenever drift rises?

**Reply:** Drift may be harmless or caused by a pipeline bug. I would identify the cause, curate labels, and validate a candidate before changing production behavior.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Measure the claim, not the headline

**Question:** How would you report confidence in an accuracy estimate?

**Answer:** I would state the population, metric definition, sample size, and uncertainty. For independent binary outcomes, a binomial interval is a useful starting point. Correlated templates or documents reduce effective independence, so I would consider grouping and stratified results. A narrow interval does not repair a test set that fails to represent real traffic.

**Remember:** Define population → quantify uncertainty → check representativeness

**Follow-up:** Does 1,080 synthetic cases make the benchmark representative?

**Reply:** No. Sample size and representativeness are different. Repeated templates can produce precise estimates for a narrow distribution without supporting broad generalization.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


# Round 3

## SQL: latest successful state

**Question:** Table events(customer_id, event_id, event_time, ingested_at, status). Return customers whose latest event is successful. Assume non-null timestamps and a unique event_id; use event time, then ingestion time, then ID to break ties.

**Answer:** I would rank every customer’s events before filtering on status. Otherwise I could return an old success even when the latest event failed. ROW_NUMBER gives one deterministic winner using the stated ordering. The final filter answers whether that winner is successful.

**Remember:** Rank all → deterministic winner → filter status

**Follow-up:** What if “latest” means the latest arrival instead?

**Reply:** I would make ingested_at the primary ordering key. The business definition of latest determines the query.

**Context:** SQL reference tested with SQLite: newer failure suppresses older success, ties resolve by ingestion then ID. Null timestamp policy must be specified if the schema permits nulls.

```
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY customer_id
    ORDER BY event_time DESC, ingested_at DESC, event_id DESC
  ) AS rn
  FROM events
)
SELECT customer_id, event_id, event_time, status
FROM ranked
WHERE rn = 1 AND status = 'success';
```

## SQL: a rolling seven-day total

**Question:** Table daily_revenue(day DATE PRIMARY KEY, revenue NUMERIC) contains exactly one row per calendar day, including zero-revenue days. Compute the total for each day and the preceding six days.

**Answer:** Because the input has one row for every calendar day, a seven-row window represents seven days. I would order by day and use six preceding rows plus the current row. If dates are missing, I would first join to a date spine or use a suitable date-range window for the database dialect.

**Remember:** Dense calendar → ordered window → missing-day policy

**Follow-up:** What happens at the beginning of the table?

**Reply:** The total uses the available rows. If the requirement demands seven complete days, I would expose a window count and filter or label incomplete windows.

**Context:** Reference tested on eight daily rows, including a zero-revenue day. ROWS is a row-count frame, not an elapsed-time frame.

```
SELECT day,
       SUM(revenue) OVER (
         ORDER BY day
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS revenue_7d,
       COUNT(*) OVER (
         ORDER BY day
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS days_in_window
FROM daily_revenue
ORDER BY day;
```

## SQL: stop a join from inflating money

**Question:** Tables orders(order_id PRIMARY KEY, customer_id, amount) and order_items(item_id PRIMARY KEY, order_id). Return total order amount per customer for orders having at least one item.

**Answer:** I would use EXISTS because I only need to know whether an item exists. A direct join creates one row per item and can multiply the order amount. The aggregation should preserve one row per qualifying order before summing by customer.

**Remember:** Preserve grain → EXISTS → sum once

**Follow-up:** Could SUM(DISTINCT amount) repair the join?

**Reply:** No. Two different orders can have the same amount. Distinct amounts would incorrectly collapse legitimate orders.

**Context:** Reference tested with multiple items per order, equal amounts on separate orders, and an order without items.

```
SELECT o.customer_id, SUM(o.amount) AS total_amount
FROM orders AS o
WHERE EXISTS (
  SELECT 1 FROM order_items AS i
  WHERE i.order_id = o.order_id
)
GROUP BY o.customer_id;
```

## Python: stream the latest event

**Question:** Given an iterable of dictionaries with customer_id, event_id, event_time and ingested_at, keep one latest event per customer. Timestamps are comparable timezone-normalized values; IDs are comparable unique integers. Return results ordered by customer ID.

**Answer:** I would maintain one best event per customer and compare a tuple of event time, ingestion time, and event ID. This handles out-of-order input without sorting all events. Processing takes O(n), plus O(k log k) to order the k customers, and O(k) storage. I would validate timestamp and key types at the input boundary.

**Remember:** One winner per key → tuple comparison → O(k) memory

**Follow-up:** What if there are too many customers for memory?

**Reply:** I would partition the data and use an external aggregation or database, rather than treating an in-memory dictionary as an unlimited solution.

**Context:** Reference tested with empty input, ties, out-of-order events, and multiple customers. Assumes all customer IDs can be sorted consistently.

```
def latest_by_customer(events):
    best = {}
    def order(event):
        return (event["event_time"], event["ingested_at"],
                event["event_id"])
    for event in events:
        key = event["customer_id"]
        if key not in best or order(event) > order(best[key]):
            best[key] = dict(event)
    return [best[key] for key in sorted(best)]
```

## Python: merge overlapping intervals

**Question:** Given integer intervals [start, end], merge overlaps and touching endpoints. Reject intervals where start > end. Return sorted merged intervals.

**Answer:** I would sort by start time, then maintain the last merged interval. If the next start is at or before the last end, I extend that interval; otherwise I append a new one. Sorting costs O(n log n), followed by a linear scan. I would clarify whether touching intervals count as overlapping before coding.

**Remember:** Sort → compare last end → extend or append

**Follow-up:** How would half-open interval semantics change it?

**Reply:** If adjacent half-open intervals should remain separate, I would use a strict overlap comparison. The merge rule must match the domain’s boundary convention.

**Context:** Reference tested for empty input, nested intervals, touching endpoints, unsorted input and invalid bounds. Stores a sorted copy and does not mutate input pairs.

```
def merge_intervals(intervals):
    ordered = sorted((start, end) for start, end in intervals)
    if any(start > end for start, end in ordered):
        raise ValueError("start must be <= end")
    merged = []
    for start, end in ordered:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
```

## Python: limit concurrent retrieval

**Question:** Implement async retrieval for a finite list of document IDs using fetch(doc_id). Preserve input order, limit concurrent calls, and apply a per-call timeout. Assume fetch supports cooperative cancellation.

**Answer:** I would use a semaphore to limit active fetches and apply the timeout only after acquiring a slot. I would return a per-document outcome so one failure does not discard successful results. This bounds active I/O, but scheduling every input still consumes memory; for very large inputs, I would use a bounded worker queue.

**Remember:** Semaphore → timeout after slot → per-item outcome

**Follow-up:** Does this guarantee a timed-out server request stopped?

**Reply:** No. Cooperative cancellation stops the client wait only as supported by the coroutine. The remote operation may continue, so side effects still require idempotency.

**Context:** Python 3.11+ reference. Tested for ordering, maximum active calls, timeout, individual error, empty input and invalid limit. Overall cancellation is not swallowed; do not expose raw exception text to clients.

```
import asyncio

async def retrieve_many(ids, fetch, limit=4, timeout=5.0):
    if limit < 1 or timeout <= 0:
        raise ValueError("limit and timeout must be positive")
    slots = asyncio.Semaphore(limit)
    async def one(doc_id):
        async with slots:
            try:
                value = await asyncio.wait_for(fetch(doc_id), timeout)
                return {"id": doc_id, "value": value, "error": None}
            except TimeoutError:
                return {"id": doc_id, "value": None, "error": "timeout"}
            except Exception as exc:
                return {"id": doc_id, "value": None,
                        "error": type(exc).__name__}
    return await asyncio.gather(*(one(doc_id) for doc_id in ids))
```

## Design: enterprise extraction

**Question:** Design an extraction platform for 100,000 tax documents per day, with bursty arrivals, human review, auditability, and safe replay.

**Answer:** I would clarify document sizes, peak arrival rate, latency targets, and critical-field error tolerance. Then I would separate durable ingestion, parsing, model extraction, validation, review, and idempotent delivery. Each result would retain source evidence and processing versions. I would monitor queue age, review rate, field errors, and cost, and size workers against peak demand and measured service time.

**Remember:** Requirements → staged processing → recoverable delivery

**Follow-up:** Give me a capacity estimate instead of listing components.

**Reply:** 100,000 per day averages about 1.16 documents per second. As a hypothetical example, a 10× peak and two seconds per document require about 24 concurrent processing slots at full utilization, before headroom. I would validate this against model batching and downstream limits.

**Context:** System-design scenario, not actual Bank of America scale. Example assumptions are explicitly hypothetical. Preserve approved human corrections across replay; model/prompt/schema versions belong in provenance.

## Design: a multi-repository assistant

**Question:** Design a codebase assistant for many repositories with frequent commits and different access permissions.

**Answer:** I would index code with repository, revision, path, and symbol metadata, then enforce access scope before retrieval. Incremental indexing would update changed files and remove deleted content. A bounded workflow would retrieve evidence, resolve gaps, and answer with source references. I would evaluate answer quality by task type and monitor freshness, cost, and latency.

**Remember:** Revision-aware index → access scope → bounded search

**Follow-up:** What if an answer combines chunks from incompatible commits?

**Reply:** I would query a consistent repository revision or clearly identify mixed-version evidence. Version metadata should control retrieval, not merely decorate citations.

**Context:** Proposed architecture for a RAG design interview. Exact RAG project implementation remains unverified.

## Design: transactional lakehouse ingestion

**Question:** Design ingestion for 5 TB per day with updates, deletes, duplicate deliveries, and downstream analytics.

**Answer:** I would clarify source guarantees and freshness needs, land immutable raw changes with source positions, then validate and merge into curated tables using stable keys and ordering. Reprocessing must be deterministic, and deletes must propagate. I would partition for actual query patterns, manage file sizes, and monitor lag, quality, and reconciliation against the source.

**Remember:** Raw changes → ordered merge → reconcile

**Follow-up:** What if an older update arrives after a newer one?

**Reply:** I would compare source versions or change positions and prevent an older event from replacing newer state. Ingestion time alone is not sufficient.

**Context:** Hypothetical design related to the scale on your résumé. The résumé does not establish a particular lakehouse format, CDC vendor, or streaming topology.

## Design: serve a fine-tuned model

**Question:** How would you serve a fine-tuned extraction model under a strict latency and cost budget?

**Answer:** I would profile preprocessing, prefill, decoding, and validation separately. I would benchmark model size and quantization on the actual extraction set, then tune batching and concurrency within memory limits. Requests need bounded queues and deadlines. I would track tail latency and cost per accepted document, including retries and human review, and roll out model changes gradually.

**Remember:** Profile → benchmark → bounded serving

**Follow-up:** Why not maximize batch size?

**Reply:** Larger batches may improve throughput while increasing queueing and tail latency. I would optimize against the service-level objective and realistic arrival patterns.

**Context:** Recommended design. No specific GPU, throughput or cost result is claimed for your past work.

## Design: safe desktop actions

**Question:** Design an assistant that can move and rename files safely while users and other apps may change them.

**Answer:** I would separate proposals from execution, bind approved arguments to observed state, and revalidate immediately before acting. Operations need stable identities, durable intent records, and verified outcomes. Recovery should inspect actual files rather than blindly replaying. Undo must detect changed content and destination collisions, with ambiguity routed to review.

**Remember:** Bind permission → revalidate → reconcile

**Follow-up:** Can you eliminate every race by hashing the source?

**Reply:** No. A file can change after a hash check. I would use suitable operating-system primitives and narrow the race window, while documenting the remaining guarantees instead of promising global atomicity.

**Context:** A design exercise inspired by MFlash. Its supplied report confirms several controls but does not establish comprehensive external-process race protection.

## Incident: latency and review rates spike

**Question:** A model update improves an offline score, but production latency and human review rates double. What do you do?

**Answer:** I would stop the rollout or revert to the known-good version while checking error severity and affected traffic. Then I would compare old and new versions on the same production-like samples, including parsing, prompt length, retries, and output behavior. I would treat the offline metric as incomplete and update the release gate to cover the regressions that mattered.

**Remember:** Contain → isolate → strengthen release gate

**Follow-up:** What if the model itself is fine and the new parser caused it?

**Reply:** I would compare complete versioned pipelines and trace stage-level changes. A model rollback alone is not enough if the regression is in preprocessing.

**Context:** Hypothetical incident response. Do not present it as an outage you personally handled.


# Round 4

## Pressure: defend your ownership

**Question:** You say you owned the workflow end to end. Be specific: what did you personally deliver?

**Answer:** At Bank of America, I work on the tax-document extraction workflow using Orchestra. My scope includes preparing extraction data, integrating document processing and APIs, building validation, and delivering the review UI. I also work with stakeholders on required fields and review needs. I would trace one document through those components and identify which parts I implemented. I would describe model training only to the extent supported by the actual Orchestra setup and run artifacts.

**Remember:** Scope → components → one concrete trace

**Follow-up:** What did Orchestra provide, and what did you implement?

**Reply:** Orchestra is the bank’s internal tool used by the extraction workflow. I would distinguish the platform-provided capabilities from my data preparation, integrations, validation, and UI work. I would not identify an underlying model or claim a training method without confirming it.

**Context:** Updated to the user-confirmed Orchestra tool. Component ownership comes from earlier supplied context; underlying model and historical tuning method remain unconfirmed.

## Pressure: your benchmark has overlap

**Question:** Your NoteEchoes templates overlap across train and test. Why should I trust your engineering judgment?

**Answer:** That finding limits the generalization claim, and I would state it directly. The saved result still measures regression behavior on those synthetic cases, but it does not establish unfamiliar-request accuracy. The appropriate next step is an independently authored holdout and a matched base-model comparison. I would use those results to decide whether the model is ready for broader use.

**Remember:** Acknowledge → scope evidence → improve test

**Follow-up:** Did you know about the overlap when you wrote the résumé?

**Reply:** The report surfaced the normalized-template finding. I would clarify when I learned it and describe the result with its scope rather than imply broader accuracy.

**Context:** Do not invent a historical discovery timeline. If asked when you first knew, answer from your actual recollection.

## Pressure: a real failure story

**Question:** Tell me about a failure you personally handled. What changed because of your actions?

**Answer:** I would use one real event and state the impact first. Then I would explain the evidence that isolated the cause, my specific corrective action, and how I verified recovery. I would close with the prevention step and its actual result. A credible answer distinguishes what I observed from what I inferred and avoids claiming a fix that was never deployed.

**Remember:** Impact → your action → verified result

**Follow-up:** Which failure from your projects can you honestly discuss?

**Reply:** The NoteEchoes failed-ingestion retry finding is a concrete code-review issue, but it is not a confirmed incident you experienced or fixed. Use it as a design reflection unless you can supply the actual history.

**Context:** No historical incident was supplied. Replace this structure with your own event before using it as a past-tense interview answer. A generic invented STAR story would undermine follow-up answers.

## Pressure: disagree with a stakeholder

**Question:** A client wants every extracted amount automatically approved. How would you respond?

**Answer:** I would align on the business objective, then make the error consequences explicit. I would propose automation for cases that meet evidence-based acceptance criteria and review for ambiguous or high-impact cases. We could measure handling time, critical-field errors, and review volume in a pilot, then expand automation as the evidence supports it.

**Remember:** Align → quantify risk → measurable pilot

**Follow-up:** They say review defeats the purpose of automation.

**Reply:** I would show total workflow effort and error cost, then target the review policy to the cases where it adds value. The goal is reliable throughput, not simply eliminating every review step.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Pressure: ship by Friday

**Question:** You have two days to deliver extraction for ten document types. How do you prioritize?

**Answer:** I would identify the highest-value document types and critical fields, agree on acceptance examples, and ship a narrow, observable workflow with a review fallback. I would make exclusions and failure behavior explicit and reserve time for integration and representative testing. A limited workflow with clear guarantees is easier to expand than a broad workflow whose failures are hidden.

**Remember:** Critical scope → acceptance examples → safe rollout

**Follow-up:** Would you skip evaluation to meet the date?

**Reply:** I would reduce scope before removing the minimum checks needed to understand quality. A deadline changes the deliverable, not the need to know whether it works.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Pressure: explain AI to a director

**Question:** Explain why the extraction system still needs human review, without technical jargon.

**Answer:** The system can do repetitive reading and field entry quickly, but unusual documents can still produce a plausible wrong value. Review focuses people on the cases where that mistake would matter. I would measure whether the combined process saves time while keeping the output dependable, and expand automatic handling as results justify it.

**Remember:** Repetitive work → consequential exceptions → measured value

**Follow-up:** Give me the single business metric you would lead with.

**Reply:** Human handling time per accepted document, including corrections, paired with critical-field error rate. Speed without a quality measure can hide a worse outcome.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.

## Pressure: when you do not know

**Question:** An interviewer asks which model and fine-tuning method Orchestra uses. How do you answer if those details are unconfirmed?

**Answer:** Orchestra is the bank’s internal tool that we use for extracting fields from tax documents. I can explain the workflow, required fields, data preparation, validation, and integrations I worked on. I would verify the underlying model and actual training artifacts before quoting a model name or tuning recipe. As a design recommendation, I would evaluate supervised fine-tuning on verified document-to-field examples if the platform supports it.

**Remember:** State limit → explain known work → reason forward

**Follow-up:** Can you explain SFT without claiming you ran it?

**Reply:** Yes. SFT learns from labeled input-output pairs. For this task the input is document content and the target is a verified structured field record. That is the approach I would evaluate; it is distinct from asserting which technique was used historically.

**Context:** Do not substitute recommended hyperparameters for a historical configuration. Concise acknowledgment is stronger than an invented number.

## Pressure: justify hiring you

**Question:** Why should we hire you for an AI engineering role?

**Answer:** I bring experience across the full path from data to a usable AI workflow. My background includes Spark pipelines, production document extraction, API and UI integration, and projects in local inference and controlled automation. I can discuss model quality and the surrounding system—how inputs are prepared, results are checked, and failures are handled. That is the combination I would bring to this role.

**Remember:** Data foundation → AI delivery → operational judgment

**Follow-up:** What do you still need to strengthen?

**Reply:** I would strengthen independent model evaluation and deepen production measurements for my personal projects. I can identify the evidence gaps and describe a concrete plan to close them.

**Context:** Keep the opening aligned with the actual job. Avoid invented team leadership, revenue impact, or adoption metrics.


# Round 5

## MCP: explain the whole path

**Question:** Explain MCP and trace a flight-status question from the user to the airline API.

**Answer:** MCP standardizes how an AI application discovers and uses external capabilities. The host manages clients connected to servers; servers can expose tools, resources, and prompts. In this example, the application chooses a flight-status tool, validates the request, invokes the server, and returns the API result to the model. The application controls orchestration and permissions.

**Remember:** Host → client → server → API

**Follow-up:** Is MCP the same as function calling?

**Reply:** No. Function calling is a model-facing interaction pattern. MCP standardizes the integration interface; an application can expose discovered MCP tools through a model’s tool-calling interface.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## MCP: tools, resources, prompts

**Question:** How would you expose an airline system through MCP?

**Answer:** I would expose get_flight_status as a tool, a policy document as a resource, and a reusable disruption-summary template as a prompt. Tools provide operations, resources provide contextual data, and prompts provide reusable message templates. I would keep each capability narrow and document its inputs, outputs, and failures.

**Remember:** Operation → context → template

**Follow-up:** Does a read-only tool need authorization?

**Reply:** Yes. Reading a reservation or passenger record exposes private information. I would authorize access to the specific object at execution time.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## MCP: transports and compatibility

**Question:** What changes between a local MCP server and a remote one?

**Answer:** Local integrations commonly use stdio; remote integrations use Streamable HTTP. For a remote service I would plan identity, TLS, deadlines, request limits, and observability. I would pin the SDK and supported protocol versions and test capability discovery and errors with the target client rather than assume compatibility.

**Remember:** Local vs remote → identity → contract tests

**Follow-up:** Would you memorize one handshake for every deployment?

**Reply:** No. Protocol versions evolve. I would explain capability discovery and verify the exact lifecycle against the SDK and specification version used by that deployment.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## MCP: secure a booking tool

**Question:** Design the security boundary for an MCP tool that changes reservations.

**Answer:** I would derive identity from a validated credential, enforce access to the reservation, validate the requested itinerary, and bind approval to the exact change and price. The server would recheck current state before committing. I would use least-privilege credentials and audit the decision without logging secrets or passenger details.

**Remember:** Identity → object access → exact approval → recheck

**Follow-up:** Can the server forward any incoming bearer token downstream?

**Reply:** No. Tokens must be intended for their recipient. I would use the appropriate downstream authorization flow and validate token audience and scope.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## MCP: timeout after a mutation

**Question:** A booking tool times out. The model asks to retry. What happens?

**Answer:** A timeout leaves the outcome uncertain. I would check the operation by its durable idempotency key or provider reference before issuing another mutation. The same key must represent the same request; a changed payload is a conflict. If the provider offers neither idempotency nor reliable status lookup, I would reconcile or escalate rather than promise duplicate-free retries.

**Remember:** Unknown outcome → lookup → reconcile

**Follow-up:** Does an in-memory set solve this?

**Reply:** No. It loses state on restart and does not coordinate replicas. The durable operation record and downstream behavior must support the guarantee.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## MCP: test the server

**Question:** What tests would you write for a new MCP server?

**Answer:** I would test discovery and schemas, valid and malformed calls, authorization failures, result formats, and timeouts. I would add cross-user access attempts, replay of mutations, stale approvals, and downstream failures. A fake backend makes failure tests deterministic; a small integration suite verifies compatibility with the actual client and pinned SDK.

**Remember:** Contract → access → failures → client

**Follow-up:** A tool schema validates. Are you done?

**Reply:** No. Schema validity says little about business correctness. A valid reservation ID can still belong to a different user, and a valid seat count can exceed inventory.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Agents: choose a workflow

**Question:** When should you use an agent, a graph, or ordinary application code?

**Answer:** I would use ordinary code for deterministic business rules and a bounded workflow when steps are known. An agent is useful when the next action depends on unstructured information. For this role I would favor explicit state transitions, typed tool results, time and cost limits, and an escalation path. I would add multiple agents only for a measured benefit.

**Remember:** Task uncertainty → bounded state → measurable benefit

**Follow-up:** Why not let the model loop until it succeeds?

**Reply:** Repeated calls can accumulate cost and repeat harmful actions. I would stop on a terminal state, budget exhaustion, repeated failure, or an action needing human review.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Agents: checkpoint and approval

**Question:** How would you resume an interrupted LangGraph workflow safely?

**Answer:** I would persist graph state with a durable checkpointer and associate it with the correct thread and user. An approval records the exact proposed action and its version. On resumption I would revalidate that action against current state. External effects need idempotency because workflow recovery can replay work.

**Remember:** Persist → bind approval → revalidate → idempotency

**Follow-up:** Is an in-memory checkpointer production recovery?

**Reply:** It can support a local demonstration but loses state on process restart. A production recovery requirement needs persistent storage and tested restart behavior.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Frameworks: defend your choice

**Question:** Compare LangGraph, Semantic Kernel, Copilot Studio, and direct tool calling.

**Answer:** I would compare required control over state, deployment, integrations, testing, and team skills. Direct tool calling suits a small orchestration loop; a graph runtime suits explicit branching and recovery. For an existing Microsoft environment I would evaluate Semantic Kernel or Copilot Studio against the same requirements. I would demonstrate depth in the framework I have actually used and prototype missing capabilities before committing.

**Remember:** Requirements → strongest known tool → validate gaps

**Follow-up:** Have you used all of them in production?

**Reply:** I would answer honestly. Familiarity with their purpose is different from implementation experience; I would connect the question to a framework I can explain from real work.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Prompt engineering: run an experiment

**Question:** How do you improve a prompt systematically?

**Answer:** I would define the task, output schema, allowed sources, and failure behavior, then build a representative evaluation set. I would add diverse few-shot examples for common ambiguities, compare one change at a time, and version prompts with model and retrieval settings. I would select using task quality, cost, latency, and important failure slices.

**Remember:** Task contract → examples → controlled evaluation

**Follow-up:** Should you always request detailed chain-of-thought?

**Reply:** No. I would ask for the required answer and concise evidence or a verifiable explanation. For multi-step tasks I can structure intermediate outputs and checks without relying on hidden reasoning as an audit trail.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Structured output: valid but false

**Question:** The model returns schema-valid JSON. How do you know it is correct?

**Answer:** I would separately validate syntax, types, business invariants, and evidence. An extracted amount should have a source location and pass currency and reconciliation checks. Missing evidence should trigger an explicit missing value or review. I would measure field correctness on labeled data; schema validation alone cannot detect a plausible wrong amount.

**Remember:** Schema → invariants → evidence → evaluation

**Follow-up:** Will temperature zero eliminate hallucinations?

**Reply:** No. It does not establish factual correctness or complete determinism across every serving setup. Retrieval, validation, and evaluation still matter.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## DDD: model an airline domain

**Question:** What does domain-driven design mean in this application?

**Answer:** I would define bounded contexts such as reservations, flight operations, and customer communication. A reservation aggregate owns its invariants, such as allowed state transitions. Domain services express business rules; infrastructure adapters connect databases and airline APIs. The agent requests an operation through an application service rather than directly editing domain state.

**Remember:** Bounded contexts → invariants → application service

**Follow-up:** Is every database table a microservice?

**Reply:** No. Service boundaries follow domain ownership and operational needs. Splitting tables into services can create distributed transactions without improving the design.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## OOP: make the model replaceable

**Question:** How would you apply SOLID principles to an AI service?

**Answer:** I would separate orchestration, retrieval, model access, and validation. Small interfaces let the application depend on capabilities rather than one vendor client. Dependency injection makes tests use deterministic fakes. I would avoid a large base class with unrelated responsibilities and prefer composition where behavior varies independently.

**Remember:** Small interfaces → composition → test doubles

**Follow-up:** How does this translate to Java?

**Reply:** The same separation maps to interfaces and constructor injection. I would keep domain validation independent of the controller and provider SDK, then use unit and integration tests around those boundaries.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## TDD: test an uncertain model

**Question:** How do you use test-driven development with an LLM?

**Answer:** I would first write failing deterministic tests for the application contract: input validation, access checks, tool routing, and failure handling. I would implement the smallest behavior and refactor. For model quality I would maintain a separate versioned evaluation suite with acceptance thresholds and representative slices. Unit tests use fake model responses; evaluations measure behavior on real model calls.

**Remember:** Red → green → refactor; contract tests + evals

**Follow-up:** Would you assert one exact natural-language paragraph?

**Reply:** Usually no. I would test required facts, supported evidence, structured fields, and unacceptable behavior. Exact equality fits deterministic structured targets when the task requires it.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## REST: long-running AI jobs

**Question:** Design a REST API for document extraction.

**Answer:** I would accept an authorized request, validate file limits, and create a durable job using an idempotency key. A 202 response returns a job reference; status and result endpoints authorize access to that job. Workers process bounded jobs, persist outcomes, and support retries and cancellation. Errors distinguish invalid input, forbidden access, rate limits, and temporary failures.

**Remember:** Validate → durable job → worker → authorized result

**Follow-up:** Can two requests use the same key with different files?

**Reply:** I would reject that conflict. The idempotency record should be scoped to the caller and bound to a canonical request fingerprint.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Cloud: deploy the service

**Question:** Describe one concrete cloud deployment for this system.

**Answer:** As a proposed Azure design, I would run the API and workers in managed containers, use a queue for long jobs, object storage for documents, a database for job state, and a managed identity and secret store for credentials. I would keep resource access private where required, scale workers to measured bottlenecks, and instrument the full request path. Equivalent AWS or GCP services can implement the same pattern.

**Remember:** API → queue → workers → state → identity

**Follow-up:** Is this what you deployed previously?

**Reply:** Only if it matches my actual work. Otherwise I would label it as my design and explain the deployment environment I really used.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## CI/CD: release an AI change

**Question:** What belongs in the pipeline for changing a model or prompt?

**Answer:** I would run unit and contract tests, dependency and secret checks, and a versioned evaluation suite. The release records the application, model, prompt, index, and configuration versions. I would deploy gradually with health and quality checks, compare against the baseline, and retain a tested rollback path. Schema and index changes need compatibility planning.

**Remember:** Tests → eval gate → versions → gradual rollout

**Follow-up:** Does rolling back the model restore everything?

**Reply:** No. Prompt, retrieval, configuration, and data migrations may also have changed. I would treat the release as a versioned bundle and check compatibility before rollback.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Observability: diagnose a regression

**Question:** Answer quality fell and latency doubled. How do you investigate?

**Answer:** I would segment by release, tenant, language, document type, and tool path, then inspect redacted traces. I would separate queue time, retrieval, reranking, model time, and tool latency. I would compare retrieval recall, schema failures, unsupported claims, token use, and retry counts with the baseline. The first mitigation could be rollback, reduced load, or disabling a failing path.

**Remember:** Segment → trace stages → compare → mitigate

**Follow-up:** Can you just log every prompt and response?

**Reply:** That can expose sensitive data. I would use controlled sampling, redaction, access restrictions, and retention rules while preserving identifiers and metrics needed for diagnosis.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Cost: estimate before optimizing

**Question:** Estimate monthly inference cost and choose an optimization.

**Answer:** I would multiply monthly calls by average input and output tokens and the applicable token rates, then add retrieval, hosting, and tool costs. For a hypothetical 100,000 calls with 2,000 input and 400 output tokens, at fictional rates of $1 and $4 per million tokens, inference is $360. I would first measure wasted context and repeated work, then compare routing, caching, or shorter outputs against quality.

**Remember:** Volume × tokens × rates → measure waste

**Follow-up:** Does caching always reduce cost safely?

**Reply:** No. The key needs the relevant user access scope and model, prompt, and content versions. Sensitive or rapidly changing answers may be unsuitable for caching.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Governance: turn policy into controls

**Question:** What would responsible AI governance look like here?

**Answer:** I would classify use-case risk and data sensitivity, assign owners, define acceptable behavior, and document model and data provenance. Controls include restricted data access, retention, evaluations of harmful or unequal outcomes, human review for consequential actions, and an incident process. Release gates and audit records make the policy enforceable in daily engineering.

**Remember:** Risk → owner → control → evidence

**Follow-up:** Can a responsible-AI document alone prevent harm?

**Reply:** No. I would connect each requirement to an implemented control, a test, an owner, and a response when the control fails.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Evaluation: calibrate the judge

**Question:** How do you make LLM-as-a-judge useful for release decisions?

**Answer:** I would define a specific rubric, calibrate it on human-labeled cases, and measure agreement and failure patterns. I would blind system identities and randomize answer order where relevant. The judge should score dimensions such as correctness and evidence support separately, with deterministic checks for fields and policy rules. I would keep model and judge versions recorded.

**Remember:** Rubric → human calibration → failure slices

**Follow-up:** The judge prefers longer answers. What changes?

**Reply:** I would inspect length bias, refine the rubric, compare paired examples, and validate again against human judgments. A convenient score is not automatically a valid measure of task success.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## A/B testing: measure business value

**Question:** How would you evaluate a new AI assistant online?

**Answer:** I would choose a primary outcome such as successfully resolved cases and guardrails such as incorrect actions, complaints, latency, and cost. I would randomize at a unit that reduces contamination, often user or account, estimate sample needs, and predefine the analysis period. I would report uncertainty and segment results; a before-and-after comparison alone can confuse product effects with traffic changes.

**Remember:** Outcome → guardrails → randomize → uncertainty

**Follow-up:** What if clicks rise but resolution falls?

**Reply:** The primary outcome and guardrails decide the result. More clicks can indicate friction rather than value; I would investigate before expanding rollout.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Drift: identify what changed

**Question:** What does drift mean for an LLM application?

**Answer:** I would distinguish changes in user inputs, source knowledge, retrieved results, and output quality. I would monitor representative data slices and regularly label recent cases. A changed embedding distribution is a signal to investigate, not proof of business failure. The response may be reindexing, prompt changes, updated evaluations, or a different model depending on the cause.

**Remember:** Input → knowledge → retrieval → outcome

**Follow-up:** How do you know without ground truth?

**Reply:** Operational proxies can flag issues, but they do not establish correctness. I would maintain a sampled human-review process and delay-dependent outcome labels where available.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Delivery: clarify and estimate

**Question:** A leader asks for an AI assistant in two weeks. What do you do?

**Answer:** I would identify users, workflow, data access, success criteria, and the consequences of a wrong answer. I would scope a thin end-to-end slice with explicit acceptance tests, list dependencies and uncertainties, and estimate a range after a short technical spike. In Agile delivery I would demonstrate working increments, collect feedback, and update risks and priorities with the product owner.

**Remember:** Requirements → acceptance → spike → increments

**Follow-up:** What would you put in the project specification?

**Reply:** Scope, inputs and outputs, domain rules, interfaces, security and reliability targets, evaluation criteria, dependencies, milestones, and assumptions. A traceable backlog and simple project spreadsheet can make ownership and progress clear.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Airline design: disrupted travel assistant

**Question:** Design an assistant that helps a passenger after a cancelled flight.

**Answer:** I would clarify whether the assistant only explains options or can rebook. Policy answers use versioned retrieval; flight status and available seats come from live tools. A bounded workflow authenticates the passenger, reads the reservation, retrieves eligible options, obtains approval for the exact itinerary and price, and commits through the reservation service with idempotency. I would recheck availability before commit, notify only after confirmation, and provide an agent handoff when state is uncertain.

**Remember:** Clarify → live tools + policy RAG → approval → safe commit

**Follow-up:** Inventory changes after the user approves. What happens?

**Reply:** I would stop that attempt, fetch current options, and request approval for the new offer. I would not silently substitute another flight or price.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Transformers: explain without hand-waving

**Question:** Explain a decoder transformer and the difference between training and inference.

**Answer:** Tokens become embeddings with position information. Causal self-attention combines information from earlier tokens, and feed-forward layers transform those representations using residual connections and normalization. Training adjusts weights using a loss such as next-token prediction; inference applies learned weights to generate tokens. Context is temporary input, while fine-tuning changes parameters.

**Remember:** Tokens → attention → layers → next-token distribution

**Follow-up:** Does attention mean the model understands or remembers everything?

**Reply:** No. Attention is a computation over representations. Limited context, learned associations, and generation errors mean I still need external evidence and task-specific evaluation.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

## Python: sliding-window rate limiter

**Question:** Implement allow(user) for at most N requests per rolling W seconds. Explain boundaries, concurrency, and scaling.

**Answer:** I would keep a deque of accepted timestamps per user, remove expired entries, and accept only below the limit. A monotonic clock avoids wall-clock jumps, and a lock protects the check-and-append operation within one process. Each timestamp is appended and removed once, giving amortized O(1) work per request. Production needs idle-key cleanup and a shared atomic implementation across replicas.

**Remember:** Deque → expire → atomic check → append

**Follow-up:** Can this enforce a global limit across four workers?

**Reply:** No. Their memory is separate. I would move the atomic decision to a shared store and explicitly define behavior when that store is unavailable.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

```
from collections import deque
from threading import Lock
from time import monotonic

class SlidingWindowLimiter:
    """Single-process limiter. Window is (now-window, now]."""
    def __init__(self, limit, window, clock=monotonic):
        if limit <= 0 or window <= 0:
            raise ValueError("limit and window must be positive")
        self.limit, self.window, self.clock = limit, window, clock
        self.events = {}
        self.lock = Lock()

    def allow(self, user):
        with self.lock:
            now = self.clock()
            queue = self.events.setdefault(user, deque())
            while queue and queue[0] <= now - self.window:
                queue.popleft()
            if len(queue) >= self.limit:
                return False
            queue.append(now)
            return True

```

## Python: combine search results

**Question:** Merge ranked lexical and vector search results using reciprocal rank fusion. Handle duplicates and deterministic ties.

**Answer:** I would accumulate 1 divided by k plus rank for each document across lists. A per-list set prevents a repeated document from gaining extra votes in that list. I would sort by descending fused score and then document ID for deterministic ties. With M total entries and U unique documents, work is O(M + U log U), and space is O(U). All candidate lists must already respect authorization.

**Remember:** Ranks → per-list dedup → score → deterministic order

**Follow-up:** Does fusion make lexical and vector scores comparable?

**Reply:** It avoids comparing their raw score scales by using ranks. The rank constant and retrieval depth still need evaluation on representative queries.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

```
def reciprocal_rank_fusion(rankings, k=60):
    """Ranked document-ID lists; equal scores break by document ID."""
    if k <= 0:
        raise ValueError("k must be positive")
    scores = {}
    for ranking in rankings:
        seen = set()
        for rank, doc_id in enumerate(ranking, start=1):
            if doc_id in seen:
                continue
            seen.add(doc_id)
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)
    return sorted(scores, key=lambda doc_id: (-scores[doc_id], doc_id))

```

## Python: evaluate extraction outputs

**Question:** Compute field accuracy and whole-document exact match. Distinguish a missing key from an explicit null; report extra documents.

**Answer:** I would define comparison rules before coding. This implementation checks exact string-or-null equality across required fields and penalizes extra fields in whole-document exact match. A sentinel separates a missing prediction from an explicit null. It reports unexpected documents separately and returns undefined rates as None for empty denominators. Runtime is linear in the fields and document IDs inspected.

**Remember:** Metric contract → sentinel → denominators → extras

**Follow-up:** Should currency strings be normalized first?

**Reply:** Only under an agreed business rule. I would parse currency and units explicitly, preserve the original evidence, and test whether normalization can incorrectly equate different amounts.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

```
def extraction_metrics(expected, predicted):
    """Mappings: document ID -> {field: string or None}.
    Equality is exact; required fields are the keys in expected.
    Missing predictions do not match an explicit None.
    """
    missing = object()
    total = correct = exact = 0
    for doc_id, truth in expected.items():
        guess = predicted.get(doc_id, {})
        matches = [guess.get(field, missing) == value
                   for field, value in truth.items()]
        total += len(matches)
        correct += sum(matches)
        exact += (doc_id in predicted and all(matches)
                  and set(guess) == set(truth))
    return {
        "field_accuracy": correct / total if total else None,
        "document_exact_match": exact / len(expected) if expected else None,
        "unexpected_documents": len(set(predicted) - set(expected)),
    }

```

## Pressure: give your 90-second project story

**Question:** Explain your most relevant AI project in 90 seconds, then defend two decisions.

**Answer:** I would structure my real example as: business problem and users; my exact ownership; data and model flow; one difficult engineering decision; evaluation and deployment; one limitation and next improvement. For the tax-extraction work using Orchestra, the bank’s internal tool, I can discuss digital PDFs and spreadsheets and extracting workflow IDs, dates, vendor, and amount. I must fill in only training settings, deployment facts, and outcomes I can substantiate.

**Remember:** Problem → ownership → architecture → evidence → limitation

**Follow-up:** What was the baseline behind the claimed savings?

**Reply:** I would name the baseline workflow, sample, measurement period, and calculation. If the percentage was an estimate rather than a controlled result, I would say so and explain what evidence I do have.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

