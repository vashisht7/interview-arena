# Understand first: interview study guide

Read the plain explanation, example, and steps before the professional answer. Open the word definitions whenever a term is unfamiliar. Examples are illustrative; project context distinguishes confirmed work from recommendations.

# Round 1

## Explain your Bank of America work

**Question:** Walk me through the tax-document extraction system you built.

### Understand it first

Field extraction means finding named pieces of information in a document and putting them into predictable slots. Orchestra is the internal bank tool used in your workflow; the tool name alone does not tell us which model runs underneath.

**Example:** A tax document says “Vendor: Example Co” and “Amount: $125.” The desired result is vendor=Example Co and amount=125, with checks that both came from the right document.

1. Read or parse the document.
2. Use Orchestra to obtain the required fields.
3. Check values against the source and send uncertain cases for review.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Qwen:** A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **OCR:** Optical character recognition: converting text visible in images or scans into machine-readable text.
- **Interface:** A contract describing what operations a component supports without requiring callers to know its implementation.

### Professional answer

At Bank of America, I work on a tax-document field-extraction workflow using Orchestra, the bank’s internal tool. The workflow processes tax-related documents and extracts required fields such as workflow IDs, dates, vendor names, and amounts into a structured result for validation and downstream use. My work spans data preparation, extraction, validation, APIs, and the review UI. Orchestra is the internal platform; I would verify its underlying model and supported adaptation methods before naming a specific training technique.

**Remember:** Tax documents → Orchestra → structured fields → validation

**Follow-up:** Why use OCR if the inputs were digital PDFs?

**Reply:** Digital PDFs may contain embedded images or unreliable text. I would extract native text first and use OCR only where needed.

**Context:** User correction: the bank workflow uses the internal tool Orchestra, not Qwen3. Previously supplied inputs, field examples, and ownership inform this summary. The underlying model, training interface, and historical fine-tuning method have not been confirmed.


## Why an LLM at all?

**Question:** Why use AI through Orchestra instead of only rules or a spreadsheet parser?

### Understand it first

Use an ordinary parser when information is already in a predictable location. A language model can help when the same meaning appears under different labels or layouts. Extra complexity needs a measurable benefit.

**Example:** One spreadsheet always has a Vendor column, so read that column directly. A set of PDFs uses “Supplier,” “Payee,” and “Vendor”; a model may help map these labels to one field.

1. Try direct extraction first.
2. Identify errors caused by varied language or layouts.
3. Compare the AI result with the simple approach on the same documents.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **LLM:** Large language model: a model trained to process and generate language, usually token by token.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Baseline:** A reference approach or earlier version used for comparison.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

I would parse reliable spreadsheet columns and native PDF text directly first. AI-assisted extraction through Orchestra can help map varied tax-document layouts and labels to a consistent set of required fields. I would compare it with a rules-based baseline on representative held-out documents, measuring field accuracy, reviewer effort, latency, and cost. Whether Orchestra exposes an LLM or another extraction model must be verified.

**Remember:** Parse first → model ambiguity → measure value

**Follow-up:** If the spreadsheet already has a vendor column, why send it to an LLM?

**Reply:** If a vendor column is reliable, I would read it directly. Sending it through a model adds cost and another opportunity for error.

**Context:** Recommended explanation for the user-confirmed Orchestra workflow. Orchestra is a tool/platform name, not evidence of a particular model family.


## Which fine-tuning fits tax-field extraction?

**Question:** For tax-document field extraction through Orchestra, which fine-tuning approach would you choose?

### Understand it first

Supervised fine-tuning means teaching a model using examples with correct answers. For extraction, each example pairs document content with the correct fields. LoRA describes which parameters are trained; it can be used while doing supervised fine-tuning.

**Example:** Training input: “Vendor: Example Co; Amount: 125 USD.” Correct output: vendor=Example Co, amount=125, currency=USD. Hundreds of varied examples teach a pattern rather than one document.

1. Check whether Orchestra supports training a model.
2. First measure its existing extraction behavior.
3. If training is available and justified, use reviewed examples and test on unseen documents.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **SFT:** Supervised fine-tuning: training on inputs paired with correct example outputs.
- **LoRA:** A method that trains small adapter matrices while keeping the base model weights fixed.
- **QLoRA:** Adapter training using a quantized frozen base model to reduce the memory used by its weights.
- **Quantization:** Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Adapter:** A small trainable addition used to adapt a model without updating all its base weights.
- **Inference:** Using a trained model to produce predictions or outputs.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Baseline:** A reference approach or earlier version used for comparison.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

I would start with supervised fine-tuning, or SFT, if Orchestra supports model adaptation and a prompted baseline still makes recurring extraction errors. The training examples pair a tax document or its extracted content with a human-verified structured answer containing the required fields. SFT teaches the input-to-output task. If the underlying model supports adapters, LoRA is a practical way to perform SFT with fewer trainable parameters; QLoRA is an option when supported quantization is needed to reduce base-weight memory. The platform’s actual capabilities determine which method is available.

**Remember:** SFT = learning task → LoRA = update method → Orchestra support

**Follow-up:** Can you fine-tune Orchestra itself with LoRA?

**Reply:** Orchestra is the internal tool. LoRA would adapt a compatible underlying model, if the platform exposes that capability. If it only offers an inference API, I would use its supported managed tuning option or improve prompts, document parsing, and validation.

**Context:** Recommended future approach, not a claim about a completed training run. User confirmed Orchestra and tax-field extraction; base model, access to weights, tuning support, and prior recipe are unknown.


## Valid JSON. Wrong money.

**Question:** The output is valid JSON, but the amount belongs to the wrong vendor. What now?

### Understand it first

A result can have the right format and the wrong meaning. Validation must check both. Think of a correctly filled form with somebody else’s amount written in it.

**Example:** The document lists Vendor A: $100 and Vendor B: $900. Outputting {vendor: A, amount: 900} may be valid structured data, but it associates the wrong facts.

1. Check the output format.
2. Trace each value to the source and its related fields.
3. Send conflicts for review and keep the example as a future test.

**Words explained**

- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Calibration:** Checking how scores or judgments correspond to reliable observed outcomes or trusted labels.
- **JSON:** A structured text format using named fields, objects, and lists.
- **Trace:** A record following a request through processing stages to show where work and failures occur.

### Professional answer

Valid JSON only proves structure. I would trace each amount back to its source, check its vendor and currency, and distinguish totals from subtotals and tax. Conflicting evidence goes to review. Then I would locate the error in parsing, extraction, or mapping and add that case to the regression set.

**Remember:** Structure ≠ correctness → evidence → regression

**Follow-up:** The model says it is 99% confident. Can it auto-approve?

**Reply:** No. A model’s self-reported confidence is not a calibrated probability. Any automatic approval threshold needs validation against labeled outcomes.

**Context:** Recommended design. This is a hypothetical failure scenario, not an incident you said occurred.


## The metric cross-examination

**Question:** How would you defend the estimated 50–60% manual-effort reduction?

### Understand it first

A savings percentage needs a clear before-and-after calculation. Include all human work, including checking and correcting the model’s output.

**Example:** Illustration only: the old process takes 10 minutes; extraction plus review now takes 4. The reduction is (10−4)/10=60%. These are teaching numbers, not your measured results.

1. Define what time is being measured.
2. Compare similar document types.
3. Include corrections and review before calculating savings.

**Words explained**

- **Causal attention:** Attention restricted so a position cannot use later tokens when predicting the next token.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **Baseline:** A reference approach or earlier version used for comparison.

### Professional answer

The 50–60% figure on my résumé is an estimate, not a controlled benchmark. To substantiate it, I would compare total human handling time before and after, including review, corrections, and exceptions, across comparable documents. Faster extraction only matters if the complete workflow takes less effort without sacrificing quality.

**Remember:** Estimate → total handling time → quality

**Follow-up:** Did time saved in extraction just move to reviewers?

**Reply:** Then the measurement is incomplete. I would include reviewer time and compare the full workflow, not just extraction.

**Context:** Do not invent sample size, baseline minutes, or a measured causal result. Verify the original basis before quoting the number as proven.


## The duplicate-delivery incident

**Question:** The API accepted your result, but your job timed out. Is retrying safe?

### Understand it first

A timeout means you stopped waiting for an answer. The other system may already have finished. An idempotency key is a stable operation ID that lets the receiver recognize a repeated request.

**Example:** You submit extraction result job-42. It is saved, but the reply is lost. Sending job-42 again should return the saved outcome rather than create another result.

1. Assign one stable ID to the intended operation.
2. Have the destination enforce uniqueness as one indivisible step.
3. Check existing status before retrying an uncertain operation.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Atomic:** Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **API:** A defined interface through which one piece of software requests work or data from another.

### Professional answer

A timeout does not mean the write failed. I would give each delivery a stable idempotency key, enforce it atomically at the destination, and persist delivery status. On an ambiguous timeout, I would reconcile before retrying. That prevents a successful delivery from becoming a duplicate.

**Remember:** Timeout ≠ failure → stable key → atomic write

**Follow-up:** Two workers both check for the same key. What stops the race?

**Reply:** A database uniqueness constraint or atomic conditional write. A separate existence check followed by an insert is vulnerable to races.

**Context:** Recommended approach; not a claim that a specific destination or API supported this in your implementation.


## MCP is not a quality metric

**Question:** You used MCP retrieval. How does that make answers accurate?

### Understand it first

MCP is a standard way for an AI application to connect to tools and information. It provides access; accuracy also depends on finding the right information and using it correctly.

**Example:** A tool successfully retrieves last year’s tax policy. The connection worked, but the answer may still be wrong for this year.

1. Check access permissions.
2. Check that retrieved information is relevant and current.
3. Check that the answer is supported by that information.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Retrieval:** Searching for and returning relevant source material.
- **Abstention:** Declining to make a prediction or take an action when the available evidence is insufficient.
- **Grounding / faithfulness:** Whether an answer is supported by supplied evidence; the evidence itself can still be outdated or wrong.
- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.

### Professional answer

MCP provides a way to expose retrieval; it does not guarantee answer quality. I would check that retrieval returns authorized, current evidence and that the answer actually follows it. If evidence is missing or conflicting, the system should clarify or abstain. I would evaluate retrieval and generation separately.

**Remember:** Access → evidence → supported answer

**Follow-up:** Can a grounded answer still be wrong?

**Reply:** Yes. An answer can faithfully repeat an outdated source. Grounding establishes support, not necessarily truth.

**Context:** Your résumé establishes MCP-based retrieval. Exact indexing, access controls and evaluation implementation are not yet supplied.


## The architecture whiteboard

**Question:** Design the tax-document pipeline for bursts, review, and safe reprocessing.

### Understand it first

A document pipeline is a series of stations: receive, read, extract, check, review, and deliver. Separating stations makes failures easier to locate and recover from.

**Example:** If 500 documents arrive together, a queue holds waiting jobs. Several workers process them, while each document keeps its own status. These numbers are illustrative.

1. Save the input before processing.
2. Track progress and errors at each station.
3. Keep old results and approved corrections when processing again.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Latency:** How long one request takes to receive its result.
- **Throughput:** How much work the system completes per unit of time.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Worker:** A process that takes a job and performs its processing steps.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

I would separate ingestion, parsing, Orchestra-based extraction, validation, review, and delivery. A durable queue absorbs bursts; versioned inputs, prompts, and outputs support replay; idempotent delivery prevents duplicates. I would monitor field errors, review rate, queue age, latency, and cost. Before sizing workers or discussing training infrastructure, I would establish document volumes, service limits, and what Orchestra actually provides.

**Remember:** Queue → validate → version → replay

**Follow-up:** How do you reprocess a document without overwriting an approved correction?

**Reply:** I would preserve the approved correction as a separate authoritative version, then stage reprocessed output for comparison rather than silently overwriting it.

**Context:** Recommended architecture. Do not describe queue technology, deployment topology or throughput as historical facts.


## The synthetic benchmark trap

**Question:** What does 96.3% action-field exact match on 1,080 synthetic cases actually prove?

### Understand it first

A benchmark is a set of test examples. Synthetic examples were created for testing rather than collected directly from normal users. A high score on familiar-looking examples may not predict performance on new requests.

**Example:** If training says “move note X to folder Y” and testing only changes X and Y, the model may recognize a template rather than handle genuinely new phrasing.

1. State exactly which fields were scored.
2. Check overlap between training and test examples.
3. Test independently written examples before making broader claims.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Inference:** Using a trained model to produce predictions or outputs.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **Synthetic data:** Examples created artificially rather than directly observed from normal use.
- **Qwen:** A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The 96.3% result is 1,040 of 1,080 synthetic action cases matching seven selected fields, with the operational checks also passing. It is not full-response or real-user accuracy. The report also found normalized template overlap with training, so I treat it as a regression benchmark. My next step would be an independently written holdout and a matched base-model comparison.

**Remember:** 1,040/1,080 → selected fields → template limitation

**Follow-up:** Would you accept that error rate for destructive actions?

**Reply:** No. For destructive actions, accuracy alone is insufficient; execution also needs authorization, state checks, and a safe failure path.

**Context:** Supplied NoteEchoes report: saved outputs were rescored, inference was not rerun. Selected fields: intent, mode, items, entities, draft, requires_confirmation, proposed_tool. No established improvement over stock Qwen.


## The retrieval autopsy

**Question:** Your codebase assistant cites code but gives the wrong answer. How do you debug it?

### Understand it first

Retrieval is the step that searches for useful source material before an answer is generated. If the search misses the right material, changing the writing instructions may not fix the answer.

**Example:** A question asks where login tokens expire. Search returns the login page but misses the token-expiry function. The model lacks the decisive evidence.

1. Confirm the right source version is indexed.
2. Inspect what search actually returned.
3. Only then examine how the model used that evidence.

**Words explained**

- **Async:** A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **RAG:** Retrieval-augmented generation: find relevant external content and supply it to a model to help answer.
- **Retrieval:** Searching for and returning relevant source material.
- **Chunk:** A bounded piece of a document or codebase used for indexing and retrieval.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **LangGraph:** A framework for representing agent workflows as stateful steps and transitions, with persistence options.

### Professional answer

I would debug retrieval before changing the prompt. First, check whether the correct repository version and relevant code reached the model. Then inspect chunk boundaries, ranking, missing dependencies, and whether the answer follows the evidence. I would evaluate retrieval and generation separately and turn the failure into a regression case.

**Remember:** Find evidence → inspect ranking → verify answer

**Follow-up:** What stops self-correcting search from looping forever?

**Reply:** A fixed search-step budget, a time budget, and a stop condition when evidence no longer improves. Without enough evidence, return a qualified answer or ask for clarification.

**Context:** Proposed RAG design. Your résumé establishes LangGraph, Claude, Pinecone, asynchronous retrieval and Ragas; exact graph, metrics and operational behavior remain unverified.


## Crash between two worlds

**Question:** A file moved, but the database journal still says pending. Recover safely.

### Understand it first

Moving a file and updating a database are separate operations. A crash can happen between them. A journal is a saved record of the intended action that helps recovery determine what happened.

**Example:** A file moves from A to B, then the app crashes before recording success. On restart, recovery checks A and B instead of assuming the move never happened.

1. Save the planned action.
2. Perform the move and verify the result.
3. On restart, compare the journal with actual files before completing or undoing.

**Words explained**

- **Atomic:** Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Transaction:** A group of database changes committed together under defined consistency guarantees.
- **Journal:** A saved record of intended or completed actions used for auditing or recovery.
- **Collision:** Here, a destination name or path is already occupied by another file.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **SQL:** A language for querying and transforming relational data.
- **Window:** A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies.

### Professional answer

The file system and SQLite are not one atomic transaction. In MFlash’s safer move path, a prepared journal record comes first, then the file operation and verification, then commitment. Recovery checks actual file contents before restoring or finalizing. If the original path is occupied, undo uses a collision-safe alternative instead of overwriting newer data.

**Remember:** Prepared record → verify bytes → safe undo

**Follow-up:** Why is SQLite WAL not sufficient by itself?

**Reply:** WAL protects database consistency. It does not make an external file operation part of the same transaction, so crash windows still need reconciliation.

**Context:** Based on supplied MFlash code-review report. The safer move path uses a destination hard link, verification, source unlink and database update. This is recoverable evidence, not a global exactly-once guarantee.


## The skewed Spark job

**Question:** A 5 TB/day pipeline slows down. One key owns 40% of the records. What do you do?

### Understand it first

Spark divides a large dataset into smaller pieces called partitions so many tasks can work in parallel. A key is the value used to group or match rows, such as customer_id. If one key occurs far more often than others, one task can receive much more work. This imbalance is called data skew; the frequent key is called a hot key.

**Example:** Imagine 100 sales rows: 60 belong to Store A, while the other 40 belong to different stores. Grouping by store may send all 60 A rows to one task. More workers do not automatically split that group. For a sum, split A rows into A-0, A-1, and A-2; total each subgroup, then add those totals back into A.

1. Find the slow task and compare its row count with others.
2. Pre-aggregate means calculate partial results before expensive data movement: local sums can become a final sum. For an average, combine sums and counts, not averages alone.
3. A separate hot-key path means process Store A rows in a special branch, process other stores normally, then combine the results. It is a processing strategy, not a file path.
4. Salting means temporarily add a bucket value to the hot key so its rows can be distributed. For a join, the matching rows on the other side must cover the same buckets; careless salting can lose matches or create duplicates.
5. Check totals and row counts, then compare time and cost. Choose the remedy that fits the actual operation.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Hot key:** A grouping or matching value that appears unusually often and can concentrate work on one task.
- **Data skew:** Uneven data distribution that gives some tasks much more work than others.
- **Salting:** Temporarily adding bucket labels to a frequent key to distribute work, then carefully preserving the original result.
- **Pre-aggregation:** Calculating partial results early to reduce data sent to a later aggregation stage. Partial sums can be added; averages require sums and counts.
- **Separate hot-key path:** A separate processing branch for frequent keys, with other keys handled normally. It is not a filesystem path.
- **Join:** Combining rows from datasets using a matching condition, such as the same customer ID.
- **Aggregation:** Combining multiple records into a summary such as sum, count, or average.
- **Worker:** A process that takes a job and performs its processing steps.

### Professional answer

I would first check whether a few keys account for most of the data and compare task sizes and durations. If one key overloads a task, I would reduce or redistribute that work. For a sum, I can calculate partial totals before combining them, which is pre-aggregation. If needed, I can process the frequent key separately or temporarily split it into buckets using salting. The method depends on whether the operation is a join or an aggregation, and I would verify that the result is unchanged before comparing runtime and cost.

**Remember:** Measure → locate skew → validate fix

**Follow-up:** Why not just add more workers?

**Reply:** Adding workers does not automatically divide records that must stay together under the same key. I would first change how that key’s work is reduced or distributed. For joins, I would inspect whether Spark’s adaptive skew handling applies before adding custom logic.

**Context:** Recommended diagnosis for a hypothetical incident; do not imply this was a specific Sedin production failure.


## Explain NoteEchoes

**Question:** Tell me about NoteEchoes in under a minute.

### Understand it first

NoteEchoes turns captured thoughts into notes, then adds AI assistance. Local inference means the model runs on the device. Saving first protects the original note even if AI processing fails.

**Example:** You dictate a grocery list. The app saves the text immediately, then attempts to organize it. If the model fails, the original list is still available.

1. Capture and save the note.
2. Run enhancement on the saved content.
3. Validate the result before applying it.

**Words explained**

- **Inference:** Using a trained model to produce predictions or outputs.
- **MLX:** A machine-learning framework for Apple silicon, used here for local model execution.
- **Qwen:** A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra.

### Professional answer

I built NoteEchoes to turn spoken thoughts and imported documents into organized, searchable notes. It combines Flutter and Swift with a specialized Qwen3-0.6B model running locally through MLX. The key design is saving the note before AI enhancement, then validating the result and rejecting it if the user has edited the note. That keeps capture useful even when generation fails.

**Remember:** Capture → local Qwen → save before AI

**Follow-up:** Is every part of the app offline?

**Reply:** No. Core inference and storage are local, but model downloads, optional web lookup and feedback, and some speech fallback paths can use the network.

**Context:** Project implementation is supported by the supplied report; personal ownership comes from your résumé. Current TestFlight status, user adoption and device performance were not verified.


## Why such a small model?

**Question:** Why Qwen3-0.6B for NoteEchoes?

### Understand it first

A small model has fewer learned parameters and can require less memory than a larger one. It may be suitable for a narrow task, but model size alone does not prove speed or accuracy.

**Example:** Recognizing “create a note” versus “search my notes” is narrower than answering arbitrary science questions. A small specialized model may handle the first task well.

1. Define the actual task.
2. Measure quality and device resource use.
3. Choose the smallest model that meets the requirements.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **MLX:** A machine-learning framework for Apple silicon, used here for local model execution.
- **Qwen:** A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra.

### Professional answer

The task is constrained intent and action interpretation, which makes a small specialized model a reasonable fit for an iPhone. The implementation uses Qwen3-0.6B with structured validation, while document answers use cited excerpts. I would justify the final model choice with device latency, memory, and task-quality measurements rather than parameter count alone.

**Remember:** Constrained task → device fit → measure

**Follow-up:** How much faster is it than a larger model?

**Reply:** I do not have a verified comparative device benchmark. I would measure cold start, warm latency, memory and battery under the same workload.

**Context:** The report confirms Qwen3-0.6B and local MLX configuration. Device benchmark results and the original model-selection rationale are unknown. Rationale here is a design explanation, not measured evidence.


## Explain your fine-tuning

**Question:** How is the NoteEchoes model adapted?

### Understand it first

The NoteEchoes training setup keeps most model parameters fixed and trains small additions called adapters. Quantization stores numbers with fewer bits. The training representation and the deployed phone representation can use different formats.

**Example:** Think of a large reference book kept unchanged, with a small set of learned annotations. The analogy explains the small update; adapters are numerical matrices rather than written notes.

1. Start from the pretrained model.
2. Train adapters on expected responses; exclude input tokens from the training loss where configured.
3. Convert and evaluate the separate deployment artifact.

**Words explained**

- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **QLoRA:** Adapter training using a quantized frozen base model to reduce the memory used by its weights.
- **rsLoRA:** A LoRA variation that changes how adapter updates are scaled as rank changes.
- **NF4:** A four-bit number representation used for quantizing approximately normally distributed weights in some training setups.
- **Quantization:** Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Adapter:** A small trainable addition used to adapt a model without updating all its base weights.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **LoRA alpha:** A setting that controls adapter-update scaling together with the implementation's rank-dependent rule.
- **Dropout:** A training technique that randomly disables some activations to reduce dependence on particular paths.
- **Learning rate:** The step-size setting controlling how strongly training updates parameters.
- **Epoch:** One pass through the training dataset.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Masked from loss:** Excluded from contributing directly to the selected training loss, such as input prompt tokens in completion-only training.
- **Completion:** The response text generated by the model after the input.
- **Attention:** A computation that combines information from token representations using learned relevance weights.
- **Inference:** Using a trained model to produce predictions or outputs.
- **MLX:** A machine-learning framework for Apple silicon, used here for local model execution.
- **Qwen:** A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra.

### Professional answer

The training pipeline adapts pretrained Qwen3-0.6B with QLoRA and rsLoRA. It keeps the base in four-bit NF4 and trains adapters on the expected completions, with prompt tokens masked from the loss. Deployment is a separate eight-bit MLX artifact. The distinction is important: training quantization and inference quantization are different stages.

**Remember:** Pretrained base → completion loss → separate deployment

**Follow-up:** What are the adapter settings?

**Reply:** The inspected initial configuration uses rank 32, alpha 64, and dropout 0.05, targeting attention and MLP projections. I would check the run artifacts before saying those settings produced the deployed checkpoint.

**Context:** Supplied report confirms configuration, not a complete training-to-shipped-weights chain. Initial learning rate 4e-5; one epoch; sequence length 1,024. No established contribution from the experimental GRPO code.


## A user edits during generation

**Question:** What happens if AI finishes after the user edits a note?

### Understand it first

AI results can arrive after the user has changed the input. Applying that old result would overwrite newer work. A fingerprint is a compact representation used to detect that the content changed.

**Example:** The model begins enhancing “Meet at 3.” You change it to “Meet at 4.” The old enhancement should be discarded because it was based on the earlier note.

1. Remember the input version.
2. Generate the result.
3. Apply it only if the current input still matches that version.

**Words explained**

- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The note is saved first. Before enhancement starts, the service records a fingerprint; before applying the result, it checks the current note against that snapshot. If the user edited or deleted it, the AI result is discarded. The user’s newer state takes precedence over delayed generation.

**Remember:** Save → fingerprint → reject stale output

**Follow-up:** Does a timeout stop the underlying model?

**Reply:** Not necessarily. A timeout can stop waiting without stopping native computation. The stale-result checks still matter even after the UI has moved on.

**Context:** Report describes inspected implementation and tests, but those application tests and device behavior were not executed in the review.


## Explain hybrid retrieval

**Question:** How does NoteEchoes find the right note?

### Understand it first

Hybrid retrieval combines keyword matching with similarity in meaning. It helps when exact names matter but users may also describe the same idea with different words.

**Example:** Searching “car repair” may match “car” exactly and also find a note about “vehicle maintenance.” Combining the two result lists can improve coverage.

1. Run keyword search.
2. Run meaning-based search if available.
3. Combine the rankings and retain source references.

**Words explained**

- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Retrieval:** Searching for and returning relevant source material.
- **Reranking:** Reordering an already retrieved candidate set using another relevance scorer.
- **Lexical search:** Search based on words or exact text matches.
- **Semantic search:** Search based on related meaning, usually through learned representations.
- **Reciprocal rank fusion:** Combining result rankings by adding a rank-based vote, commonly 1/(k+rank), for each document.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Coverage:** The share of eligible cases handled or accepted under the chosen policy.
- **SQL:** A language for querying and transforming relational data.

### Professional answer

It combines SQLite full-text search with optional multilingual E5 embeddings and merges their rankings using reciprocal rank fusion. Lexical search catches exact terms; semantic search catches related meaning. The active conversation and PDF paths return cited excerpts. That keeps the answer tied to the stored material rather than asking the action model to improvise document answers.

**Remember:** Exact terms + meaning → rank fusion → excerpts

**Follow-up:** Is the knowledge graph a reasoning engine?

**Reply:** It organizes related notes into topics and displays topic membership. I would describe it as a note-and-topic graph, not an entity-reasoning engine.

**Context:** Report: FTS5/BM25; multilingual-e5-small, 384 dimensions; RRF 1/(60+rank); up to 15 candidates per retrieval branch, six final by default. No learned reranker in this path; quality metrics unverified.


## What would you improve?

**Question:** What is the biggest weakness in NoteEchoes today?

### Understand it first

Generalization means working on cases different from the examples used for development. Before making a model more complicated, find out whether the current one works on truly new inputs.

**Example:** A note model succeeds on test phrases copied from a template, but fails on a user’s rambling voice note. A new test set should include that natural language.

1. Create independently written examples.
2. Compare the original and adapted model under equal conditions.
3. Measure behavior on the actual device.

**Words explained**

- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **Completion:** The response text generated by the model after the input.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Generalization:** Performance on new cases beyond those used for training or development.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Synthetic data:** Examples created artificially rather than directly observed from normal use.

### Professional answer

The biggest evaluation gap is generalization. The synthetic score is useful for regressions, but normalized templates overlap with training and there is no completed matched base-model comparison. I would first build an independent real-language holdout, then measure device performance and strengthen failed-document retry handling.

**Remember:** Known gap → independent evaluation → recovery

**Follow-up:** What is the failed-document issue?

**Reply:** The review found that a failed PDF can be recognized by its existing hash and returned without checking completion. I would make deduplication status-aware so failed ingestion can be retried safely.

**Context:** The failed-PDF case is inferred from inspected code, not a reproduced or personally reported historical incident. Proposed improvements are not completed features.


## Explain MFlash

**Question:** What makes MFlash an engineering project rather than a model demo?

### Understand it first

MFlash proposes file actions, then checks whether they are allowed and still make sense. A model suggestion is only one part of safe automation.

**Example:** A model suggests moving report.pdf. The app checks permission, verifies which file it is, records the operation, and avoids overwriting a different file at the destination.

1. Understand the request.
2. Propose a specific action.
3. Validate permission and current state, then execute and verify.

**Words explained**

- **Journal:** A saved record of intended or completed actions used for auditing or recovery.
- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **Collision:** Here, a destination name or path is already occupied by another file.
- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Retrieval:** Searching for and returning relevant source material.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I built MFlash as a macOS assistant for local document retrieval and scoped file operations. It separates action suggestions from execution policy: supported actions pass through argument, authorization, and state checks before execution. The file paths include hashes, retry receipts, journaling, and collision-safe undo. The strongest part is controlling what happens around a model decision, not just generating the decision.

**Remember:** Local assistant → execution boundary → recovery

**Follow-up:** Is it a production-ready computer-use agent?

**Reply:** It is a design preview with supported workflows and experimental visual paths. I would demonstrate specific tested operations rather than claim general autonomous reliability.

**Context:** Supplied MFlash report. Personal project ownership is résumé-based; the code review itself cannot establish authorship or adoption. Ordinary scheduler policy and explicit workbench approval are distinct.


## Why two decision models?

**Question:** How do the classifier and MPNet ranker differ?

### Understand it first

A classifier selects a category. A ranker orders a list of choices. These solve different parts of choosing an action.

**Example:** The classifier selects “move file.” The ranker compares proposed destinations A, B, and C. A separate permission check decides whether a move can actually happen.

1. Choose the action category.
2. Compare the available candidates.
3. Apply execution checks independently of model scores.

**Words explained**

- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Projection head:** A trainable layer that maps a model representation into another space suited to the task.
- **MPNet:** A pretrained language-model architecture commonly used in sentence embedding models; the project uses it as a representation backbone.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The classifier maps request and observation features to an action template. The MPNet ranker compares a state with supplied candidate actions using learned projection heads. One selects a structured pattern; the other ranks alternatives. Neither model’s score grants permission to execute—the execution layer makes that decision separately.

**Remember:** Template selection → candidate ranking → separate authority

**Follow-up:** Are 74 templates the same as 74 tools?

**Reply:** No. That is the template count from a historical training run. Templates include argument-binding patterns, so it is not a count of independent tools or universal capabilities.

**Context:** Report: random-initialized MLP classifier; frozen all-mpnet-base-v2 backbone with distinct state/action projection heads. The 74 count is data-derived and historical.


## Defend the perfect ranker score

**Question:** Your ranker got 100%. Why is that not enough?

### Understand it first

A perfect score means little until you know what was tested. Picking the right choice from a supplied list is easier than discovering and completing the whole task.

**Example:** A test gives the model three actions and one is correct. Choosing it does not prove the model could find the file, invent the action, or safely execute it.

1. Describe the supplied inputs and choices.
2. State exactly what counted as success.
3. Test the full workflow separately.

**Words explained**

- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Completion:** The response text generated by the model after the input.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The recorded score is 1,381 out of 1,381 development candidate sets. The correct action was already supplied among the choices. That measures ranking, not discovering actions, understanding the screen, executing safely, or completing a workflow. I would validate real task completion separately before making an automation reliability claim.

**Remember:** Development candidates → narrow metric → task success

**Follow-up:** Were the negative examples mined online?

**Reply:** The inspected data generators use authored alternatives and sampled distractors. Online hard-negative mining and their measured difficulty were not established.

**Context:** The score is from a saved report and was not rerun. Do not call it a fresh held-out test or 100% automation accuracy.


## Why contrastive learning?

**Question:** Explain the ranking objective without jargon.

### Understand it first

Contrastive learning teaches a model which items belong together and which do not. For action ranking, a good action should score higher than similar but incorrect actions.

**Example:** For “move this PDF to Taxes,” the correct move should beat “delete this PDF” and “move a different PDF to Taxes.” The close wrong choices make useful training examples.

1. Pair the state with the correct action.
2. Include plausible incorrect alternatives.
3. Train the comparison and evaluate it on new candidate sets.

**Words explained**

- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Batch:** A group of examples or requests processed together.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Contrastive learning:** Training representations or scores to favor matching pairs over nonmatching alternatives.
- **Projection head:** A trainable layer that maps a model representation into another space suited to the task.
- **MPNet:** A pretrained language-model architecture commonly used in sentence embedding models; the project uses it as a representation backbone.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The ranker learns to score the correct action above plausible alternatives for the same state. MPNet supplies text representations; trainable projection heads learn how state and action representations should align. The loss penalizes competing negatives that score too highly. This trains selection among candidates rather than free-form action generation.

**Remember:** Correct action > alternatives → learned alignment

**Follow-up:** Did you use in-batch negatives?

**Reply:** There are two recipes: one mixes hard-negative and symmetric in-batch losses, while another compares each example with its own negatives. I would identify the checkpoint’s recipe before attributing either to it.

**Context:** Report records two distinct training scripts. Which full recipe produced the current root checkpoint is unknown.


## Changed file after approval

**Question:** What if the source file changes after a workbench preview?

### Understand it first

Approval is tied to the specific thing the user reviewed. If the file changes afterward, the old approval may no longer apply. A digest is a content fingerprint used to detect this.

**Example:** You approve moving a harmless draft, but another process replaces the file before execution. Checking the content again detects the change.

1. Record the approved file and action.
2. Recheck the current file before acting.
3. Stop and review if the file or request changed.

**Words explained**

- **Executor:** A Spark process that runs tasks and holds data on a worker machine.
- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **Collision:** Here, a destination name or path is already occupied by another file.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

The workbench captures a source digest and checks the action against the trusted grant before execution. It recomputes the digest and rejects a changed source. If an earlier attempt is still pending, it requires review instead of blindly retrying. Approval applies to the reviewed operation and state, not whatever happens to exist later.

**Remember:** Preview digest → grant match → reject changes

**Follow-up:** What evidence do you have that this works?

**Reply:** The supplied review ran 12 isolated executor tests covering cases such as retries, cancellation, collisions, and changed sources. That supports those tested paths, not all production workflows.

**Context:** Test result is reported by the supplied briefing, not rerun in this interview-dashboard task. External-process races are not fully covered by the executor guarantees.


## Explain your RAG assistant

**Question:** Give me a concise overview of the codebase assistant.

### Understand it first

RAG means retrieval-augmented generation: search for relevant material, then give it to a language model to help answer. A codebase assistant uses repository files as that material.

**Example:** For “Where is password reset handled?”, the assistant searches code, supplies relevant functions to the model, and cites the files in its answer.

1. Find relevant code.
2. Provide it as evidence.
3. Generate an answer with references and handle missing evidence.

**Words explained**

- **Async:** A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **RAG:** Retrieval-augmented generation: find relevant external content and supply it to a model to help answer.
- **Retrieval:** Searching for and returning relevant source material.
- **Chunk:** A bounded piece of a document or codebase used for indexing and retrieval.
- **LangGraph:** A framework for representing agent workflows as stateful steps and transitions, with persistence options.

### Professional answer

I built a codebase assistant using LangGraph, Claude, Pinecone, and FastAPI, with asynchronous retrieval and self-correcting search. The aim was to answer developer questions using repository evidence. The key engineering issue is separating missing evidence from poor generation: a better prompt cannot recover code that retrieval never found.

**Remember:** Developer questions → repository evidence → diagnose retrieval

**Follow-up:** What did the evaluation prove?

**Reply:** My résumé lists Ragas evaluation, but I do not have the run results here. I would discuss the evaluation dimensions without inventing an improvement percentage.

**Context:** Opening uses résumé claims. No repository briefing was supplied for this project; exact agent roles, embeddings, chunking and results remain unverified.


## Design the graph

**Question:** What would a sensible LangGraph workflow look like?

### Understand it first

A graph here is a workflow of named steps and decision points. State is the information carried between those steps. A retry budget limits how many times a search can repeat.

**Example:** Question → search code → enough evidence? If yes, answer. If no, try one improved search, then explain the remaining gap.

1. Define each step clearly.
2. Save retrieved files and attempted searches in state.
3. Set a stopping rule so failures cannot loop forever.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **LangGraph:** A framework for representing agent workflows as stateful steps and transitions, with persistence options.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would use a small, explicit workflow: understand the question, retrieve code, inspect evidence gaps, then answer with source references. If evidence is weak, rewrite the query and retry within a strict budget. I would track retrieved files, repository version, and attempted queries in state so retries add information instead of repeating the same search.

**Remember:** Question → retrieve → inspect → answer

**Follow-up:** Why not use more agents?

**Reply:** Every extra agent adds latency, cost, and coordination failure modes. I would add one only when a controlled evaluation shows that its responsibility improves the result.

**Context:** Proposed design for the résumé project, not a recovered description of its actual graph. No fabricated production outcomes.


## Chunking and freshness

**Question:** How would you index a changing codebase?

### Understand it first

Chunking splits large content into searchable pieces. Freshness means those pieces reflect the current source. Good pieces retain enough context to make sense on their own.

**Example:** Splitting halfway through a function separates its arguments from its logic. Keeping the function together and recording its file version helps produce a useful answer.

1. Choose meaningful boundaries.
2. Attach path and version information.
3. Update changed content and remove deleted content from search.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Retrieval:** Searching for and returning relevant source material.
- **Chunk:** A bounded piece of a document or codebase used for indexing and retrieval.
- **Reranking:** Reordering an already retrieved candidate set using another relevance scorer.
- **Semantic search:** Search based on related meaning, usually through learned representations.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.

### Professional answer

I would chunk around functions and classes where possible, preserve file paths and symbols, and attach a repository revision to every chunk. Changes should trigger targeted reindexing and removal of deleted code. At query time, I would combine exact symbol lookup with semantic retrieval and include enough surrounding context to understand dependencies.

**Remember:** Symbol boundaries → revision metadata → targeted updates

**Follow-up:** Would you always use a reranker?

**Reply:** No. I would add one only if ranking errors justify its latency and cost on representative queries.

**Context:** Recommended indexing approach; parser, embedding model, chunk sizes, incremental indexing and reranking are not confirmed implementation details.


## Tell me about yourself

**Question:** Give me your introduction in 45 seconds.

### Understand it first

An introduction gives the interviewer a short map of your experience: your current focus, relevant background, and the kind of problems you solve. You do not need to list every tool.

**Example:** A simple order is: AI engineering today → data engineering background → tax-document extraction and personal projects → why those skills fit this role.

1. Start with your professional focus.
2. Mention one or two relevant examples.
3. Connect them to the role without adding unverified claims.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **Databricks:** A data and AI platform that supports workflows including Spark processing.
- **Thread:** An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope.
- **API:** A defined interface through which one piece of software requests work or data from another.
- **Retrieval:** Searching for and returning relevant source material.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

I’m an AI engineer with a foundation in data engineering. At Bank of America, I work on tax-document field extraction using Orchestra, the bank’s internal tool, alongside retrieval workflows, owning work from data preparation through APIs and user review. Earlier, I worked on Spark and Databricks pipelines at Sedin. My projects extend that experience into local AI and controlled automation. The common thread is turning model outputs into systems people can actually use.

**Remember:** AI role → data foundation → usable systems

**Follow-up:** Why are you targeting AI engineering?

**Reply:** I enjoy the boundary between models and software: choosing the task, preparing the data, evaluating behavior, and building reliable execution around it. My experience spans that full path.

**Context:** Résumé and supplied project reports. No new metrics, employers, responsibilities, or adoption claims introduced.


## Your contribution at Sedin

**Question:** What did you do at Sedin Technologies?

### Understand it first

Data engineering prepares data so other systems can use it reliably. ETL means extract, transform, load; ELT means extract, load, then transform. Spark distributes processing, and PySpark lets you use Spark through Python.

**Example:** A pipeline reads daily transactions, removes invalid rows, standardizes dates, and writes a table for reporting. The stated 5 TB/day is a résumé claim whose measurement you should be able to explain.

1. Name the source and destination.
2. Explain the transformations you owned.
3. Describe how you checked completeness and handled failures.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **PySpark:** The Python interface for using Spark.
- **Databricks:** A data and AI platform that supports workflows including Spark processing.
- **Transaction:** A group of database changes committed together under defined consistency guarantees.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **NLP:** Natural language processing: software methods for analyzing or generating human language.
- **SQL:** A language for querying and transforming relational data.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

At Sedin, I worked on Databricks ETL and ELT pipelines using Spark, PySpark, Python, and SQL, processing over 5 TB of transactional data daily. I also developed backend services and NLP summarization pipelines. That experience gave me the data-processing foundation I now bring to AI workflows: transforming inputs, integrating services, and evaluating outputs.

**Remember:** 5 TB/day → Spark pipelines → AI foundation

**Follow-up:** Was 5 TB your personal throughput improvement?

**Reply:** No. It describes the processing scale stated on my résumé, not an improvement percentage or an individual benchmark. I would explain my specific pipeline contribution separately.

**Context:** Résumé-backed. Source formats, cluster size, scheduling, table design and actual incidents have not been supplied.


## Your Cactus Club project

**Question:** Describe the file-sharing application you built.

### Understand it first

A file-sharing system has three basic concerns: who is signed in, where files are stored, and who is allowed to read them. Encryption transforms readable content into a form that needs a key to decode.

**Example:** Alice shares a file with Bob. Authentication identifies Bob; access rules check the share; encryption protects content according to the system’s key design.

1. Explain upload and storage.
2. Explain how sharing permission is checked.
3. Explain the key and decryption flow only as implemented.

**Words explained**

- **Authentication:** Checking who the caller is.
- **Metadata:** Descriptive information such as source path, date, owner, or document version.
- **Cognito:** An AWS service used for user identity and authentication.
- **S3:** AWS object storage used to store files and other blobs.
- **DynamoDB:** An AWS managed database often used for key-based access to records and metadata.
- **Key pair:** Two related cryptographic keys, commonly a public key and private key, used under a specific encryption or signature scheme.

### Professional answer

At Cactus Club, I built an internal React file-sharing application for about 200 users, supporting files up to 10 MB. It used Cognito authentication, encrypted S3 storage, and DynamoDB for sharing history and audit metadata. I also implemented key-pair generation and recipient-only decryption, connecting the user experience with access and data protection.

**Remember:** User need → storage/access → recipient decryption

**Follow-up:** Does encrypted S3 storage mean only the recipient can decrypt?

**Reply:** No. Storage encryption and recipient-only decryption are separate protections. I would explain the key ownership and client decryption flow from the implementation before claiming end-to-end guarantees.

**Context:** Résumé-backed. Cryptographic algorithms, private-key storage, recovery and threat-model details are not supplied.


## Explain your summarization work

**Question:** How did your earlier NLP summarization pipeline work?

### Understand it first

Extractive summarization selects sentences already present in the document. It does not write entirely new sentences. The challenge is choosing important sentences that still make sense together.

**Example:** A long report contains ten paragraphs. The system scores sentences, selects three, and arranges them into a short summary. A selected sentence saying “this result” may need the preceding sentence for context.

1. Represent and score source sentences.
2. Select important sentences while controlling repetition.
3. Compare with reference summaries and inspect readability.

**Words explained**

- **PySpark:** The Python interface for using Spark.
- **Coverage:** The share of eligible cases handled or accepted under the chosen policy.
- **ROUGE:** A family of text-overlap measures comparing summaries with reference summaries; overlap alone does not prove quality.
- **TF-IDF:** A weighting method that highlights words common in a document but less common across the collection.
- **PageRank:** A graph-ranking method that can score sentences by their connections to other sentences in summarization.
- **NLP:** Natural language processing: software methods for analyzing or generating human language.
- **Trace:** A record following a request through processing stages to show where work and failures occur.

### Professional answer

At Sedin, I worked on extractive summarization using TF-IDF, PageRank, and PySpark, with ROUGE for evaluation. The approach selects important source sentences instead of generating new ones. The tradeoff is easier source traceability, but sentence selection can still lose context or produce a disjointed summary.

**Remember:** Extractive → source sentences → quality tradeoff

**Follow-up:** Does a high ROUGE score prove a good summary?

**Reply:** No. ROUGE measures overlap with reference text. I would also assess coverage, redundancy, coherence, and whether the summary preserves the source’s meaning.

**Context:** Résumé confirms the named methods. Exact graph construction, preprocessing and measured ROUGE results remain unknown.


## Lead with ownership

**Question:** What does end-to-end ownership mean in your Bank of America role?

### Understand it first

Ownership means what you personally did and decided. End-to-end work means connecting several stages into a working product, even if other people provided the platform.

**Example:** You may own the extraction examples, validation, API integration, and review screen while the bank team owns Orchestra. Explain that boundary clearly.

1. Identify your components.
2. Trace one document across them.
3. Separate your contribution from the team’s and platform’s.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **Trace:** A record following a request through processing stages to show where work and failures occur.
- **Acceptance criteria:** Concrete conditions used to decide whether delivered behavior meets the requirement.

### Professional answer

I worked directly with clients to understand the extraction requirements, prepared training data, integrated the model into the processing workflow, and built validation, APIs, and the review UI. That meant connecting the requested fields to a usable downstream output and keeping the review process part of the product—not treating the model as the whole solution.

**Remember:** Requirements → implementation → usable delivery

**Follow-up:** How did you prioritize requirements?

**Reply:** I would prioritize critical fields and failure consequences first, define acceptance examples with stakeholders, and separate must-have correctness from convenience features.

**Context:** Ownership is user-confirmed and résumé-supported. Prioritization answer is a recommended method, not a supplied historical process.


## A credible weakness answer

**Question:** What would you improve in one of your projects?

### Understand it first

A useful weakness answer identifies a real limitation and a concrete way to improve it. It should show that you understand the evidence behind your claims.

**Example:** A synthetic test set is useful, but may not cover how real people speak. Improving independent evaluation is a specific next step.

1. Name the limitation.
2. Explain its consequence.
3. Describe the next measurement or change.

**Words explained**

- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **Synthetic data:** Examples created artificially rather than directly observed from normal use.

### Professional answer

For NoteEchoes, I would strengthen the evaluation before adding more model complexity. The existing synthetic benchmark catches regressions, but template overlap limits what it says about unfamiliar requests. I would add an independent human-authored holdout, compare against the base model under matched settings, and measure actual device performance.

**Remember:** Specific gap → concrete plan → measurable outcome

**Follow-up:** Would you remove the 96.3% result?

**Reply:** I would keep it only with its exact scope: selected action fields on synthetic cases. I would not present it as general real-world accuracy.

**Context:** Grounded in the supplied NoteEchoes review. These are proposed improvements, not completed work.


## Prepare tax-document training examples

**Question:** What would the training data for Orchestra-supported extraction look like?

### Understand it first

Training data is a collection of example inputs and correct outputs. For extraction, the correct answer must come from the document and follow the intended field definitions.

**Example:** If “amount” means total tax due, do not label some documents with subtotal and others with balance paid. Inconsistent labels teach inconsistent behavior.

1. Write field definitions.
2. Have reviewers verify examples and missing values.
3. Include varied layouts and difficult cases within approved data handling.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

Each example would contain a tax document’s content, a consistent extraction instruction and schema, and the correct structured fields verified by a reviewer. For example, a document stating “Vendor: Example Co; Amount: 125.00 USD” could map to {"vendor": "Example Co", "amount": "125.00", "currency": "USD"}. I would include missing fields, repeated entities, multiple dates, tables, poor scans, and corrected mistakes. Absent evidence maps to an explicit missing value. All data preparation and training would stay in the bank-approved environment.

**Remember:** Document + schema → verified fields → difficult cases

**Follow-up:** Would you create a separate training example for every tax value?

**Reply:** The goal is to learn extraction behavior, not memorize particular documents. Examples should cover varied structures and field relationships; evaluation must test new documents and templates.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.


## Evaluate a tax-extraction fine-tune

**Question:** How would you decide whether fine-tuning improves the Orchestra workflow?

### Understand it first

Evaluation checks whether the adapted model extracts the right fields on documents it did not train on. A fair comparison uses the same test set for each approach.

**Example:** A model gets vendor names right but associates amounts with the wrong vendors. Overall formatting success would miss the critical problem.

1. Keep independent test documents.
2. Compare parsing, prompted extraction, and any tuned candidate.
3. Report field accuracy, relationships, review effort, and operational cost.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Latency:** How long one request takes to receive its result.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Attention:** A computation that combines information from token representations using learned relevance weights.
- **Normalization:** Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules.
- **Data leakage:** Information improperly crossing from training or model selection into evaluation, making results misleading.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Baseline:** A reference approach or earlier version used for comparison.
- **Precision:** Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.

### Professional answer

I would compare direct parsing, a prompted baseline, and the tuned candidate on the same held-out documents. I would split by document family or template and check duplicates to reduce leakage. Metrics include per-field exact match with agreed normalization, precision and recall for present fields, missing-field handling, whole-record correctness, vendor-amount association, schema validity, and review effort. I would report failures by document type and choose a candidate only if it improves the required quality without unacceptable latency or cost.

**Remember:** Independent holdout → baseline comparison → field and workflow quality

**Follow-up:** Training loss drops. Is that sufficient?

**Reply:** No. Lower token loss can reflect better formatting while important fields remain wrong. Selection needs held-out extraction and workflow metrics, with extra attention to high-impact errors such as incorrect amounts.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.


## SFT, LoRA, QLoRA: what changes?

**Question:** How do SFT, LoRA, and QLoRA relate, and would you use DPO or continued pretraining?

### Understand it first

These terms describe different choices. SFT defines learning from correct examples. LoRA defines a small parameter-update method. QLoRA adds a quantized base model to reduce memory for those weights.

**Example:** You can do SFT using LoRA: teach document-to-field examples while changing only adapters. This is like choosing both the lesson and the method of writing notes; they answer different questions.

1. Choose the learning task.
2. Check which training methods the platform supports.
3. Select memory and precision options using measured quality.

**Words explained**

- **SFT:** Supervised fine-tuning: training on inputs paired with correct example outputs.
- **LoRA:** A method that trains small adapter matrices while keeping the base model weights fixed.
- **QLoRA:** Adapter training using a quantized frozen base model to reduce the memory used by its weights.
- **Quantization:** Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Adapter:** A small trainable addition used to adapt a model without updating all its base weights.
- **Precision:** Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **DPO:** Direct Preference Optimization: training from preferred versus less-preferred response pairs; it is different from simply supplying one correct target output.
- **Pretraining:** Initial broad training of a model; continued pretraining adds further domain-text training before or alongside task adaptation.

### Professional answer

SFT is training on correct example responses. LoRA changes a model through small adapter matrices while freezing the base weights. QLoRA combines adapter training with a quantized frozen base to reduce memory used by base weights. You can therefore perform SFT using LoRA or QLoRA; they are not competing task objectives. For field extraction, labeled correct outputs are a direct starting point. Preference optimization such as DPO targets preference comparisons, while continued pretraining learns from domain text; neither replaces task-specific extraction examples or evaluation.

**Remember:** Objective: SFT → parameters: LoRA → memory: QLoRA

**Follow-up:** Is QLoRA automatically best for every bank system?

**Reply:** No. Model compatibility, bank policy, hardware, precision requirements, managed platform support, and measured extraction quality determine the choice. I would not assume Orchestra exposes adapter training.

**Context:** Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.


# Round 2

## Fine-tuning, RAG, or prompting?

**Question:** A new document workflow performs poorly. How do you choose between prompting, RAG, and fine-tuning?

### Understand it first

Prompting changes instructions. RAG supplies relevant external information at answer time. Fine-tuning changes learned model parameters. Choose based on the kind of failure.

**Example:** If the model lacks the latest policy, retrieve the policy. If it knows the content but repeatedly maps fields incorrectly, better instructions or task training may help.

1. Identify whether the failure is knowledge, behavior, or format.
2. Try the simplest appropriate fix.
3. Compare quality and cost on the same examples.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **RAG:** Retrieval-augmented generation: find relevant external content and supply it to a model to help answer.
- **Retrieval:** Searching for and returning relevant source material.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Baseline:** A reference approach or earlier version used for comparison.

### Professional answer

I would first classify the failure. Missing external knowledge points toward retrieval. Inconsistent behavior or output mapping may justify fine-tuning after a strong prompt baseline. Format failures may need constrained output and validation. I would compare the simplest viable approaches on the same held-out examples, using task accuracy, latency, cost, and review effort.

**Remember:** Diagnose → baseline → compare

**Follow-up:** Can fine-tuning keep enterprise knowledge current?

**Reply:** It can encode information, but frequent factual updates are usually easier to manage through retrieval. Fine-tuning is not a dependable database of current facts.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Explain LoRA mathematically

**Question:** What does LoRA actually train, and what does rank control?

### Understand it first

A model weight matrix is a grid of learned numbers. LoRA leaves that grid fixed and learns a smaller update represented by two matrices. Rank sets the size of this update.

**Example:** For a 100×100 weight matrix, full training changes 10,000 numbers. A rank-4 LoRA update can use a 100×4 matrix and a 4×100 matrix: 800 trainable numbers, ignoring other model components.

1. Keep the original weights W fixed.
2. Learn A and B so the update is B×A, with a scaling factor in typical implementations.
3. Choose rank by testing quality and memory use.

**Words explained**

- **LoRA:** A method that trains small adapter matrices while keeping the base model weights fixed.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Overfitting:** Learning training examples so specifically that performance on new examples suffers.
- **Data leakage:** Information improperly crossing from training or model selection into evaluation, making results misleading.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Protocol:** Agreed rules for how systems exchange and interpret messages.

### Professional answer

LoRA freezes a weight matrix W and learns an update expressed as the product of two smaller matrices: delta W equals B times A. Rank controls the size of that update space and the number of trainable parameters. Higher rank gives more capacity but also increases memory and overfitting risk. I would choose it using held-out task performance.

**Remember:** Frozen W → B×A → capacity tradeoff

**Follow-up:** Is doubling rank guaranteed to improve quality?

**Reply:** No. More parameters cannot fix poor labels or leakage. I would compare ranks with the same data, evaluation protocol, and realistic compute budget.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## What QLoRA saves

**Question:** Does four-bit QLoRA mean the entire training process uses four-bit memory?

### Understand it first

Training memory stores more than model weights. It also holds intermediate calculations, gradients, and optimizer information. Compressing the frozen weights only reduces part of the total.

**Example:** A smaller book on a desk does not shrink every worksheet beside it. Likewise, four-bit base weights do not make all training data and intermediate values four-bit.

1. Separate base-weight memory from other memory.
2. Inspect which part causes the limit.
3. Adjust sequence length, batch size, or supported memory-saving options.

**Words explained**

- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **QLoRA:** Adapter training using a quantized frozen base model to reduce the memory used by its weights.
- **Quantization:** Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Adapter:** A small trainable addition used to adapt a model without updating all its base weights.
- **Batch:** A group of examples or requests processed together.
- **Gradient:** Numbers describing how changing parameters affects the training loss; used to guide updates.
- **Optimizer:** The algorithm that uses gradients to update trainable parameters.
- **Activation:** An intermediate numerical result produced as input passes through model layers.
- **Precision:** Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

No. QLoRA stores the frozen base weights in a quantized representation and trains adapters. Computation, activations, adapter parameters, gradients, and optimizer state still require memory at other precisions. The saving is substantial for base weights, but sequence length and activation storage can still make a training run run out of memory.

**Remember:** Quantized weights → train adapters → activation budget

**Follow-up:** What would you change first if training runs out of memory?

**Reply:** I would inspect memory usage, then reduce sequence length or microbatch size, consider gradient checkpointing, and recover the desired effective batch through accumulation where appropriate.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Loss versus task success

**Question:** Why can training loss fall while document extraction gets worse?

### Understand it first

Loss is the numerical training error the optimizer tries to reduce. The business outcome may care about a small set of critical fields more than average token prediction.

**Example:** A model learns JSON punctuation perfectly but still copies the wrong tax amount. Its average loss can improve while the extraction workflow remains unreliable.

1. Track training loss.
2. Also measure field correctness and severe errors.
3. Select the saved model using task results, not loss alone.

**Words explained**

- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Optimizer:** The algorithm that uses gradients to update trainable parameters.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **JSON:** A structured text format using named fields, objects, and lists.

### Professional answer

Token-level loss averages prediction quality across the target sequence. It may improve on common formatting while rare critical fields get worse. I would track held-out field exact match, missing-field handling, schema validity, and error severity alongside loss. A lower loss is useful evidence, but the checkpoint must meet the actual extraction objective.

**Remember:** Token objective → field objective → checkpoint

**Follow-up:** Why mask prompt tokens in completion-only training?

**Reply:** The loss then focuses on predicting the response rather than reproducing the prompt. The prompt still provides context to the model.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Detect overfitting and leakage

**Question:** Your training score rises sharply. What convinces you the model actually improved?

### Understand it first

Overfitting is learning the training examples too specifically. Leakage happens when information from training or model selection improperly reaches the test. Both make scores look better than real-world performance.

**Example:** Train and test documents may have different IDs but the same template and nearly identical sentences. A random row split can put almost the same case in both sets.

1. Separate related documents together.
2. Use validation data to choose settings.
3. Reserve a final independent test set.

**Words explained**

- **Overfitting:** Learning training examples so specifically that performance on new examples suffers.
- **Data leakage:** Information improperly crossing from training or model selection into evaluation, making results misleading.
- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Generalization:** Performance on new cases beyond those used for training or development.

### Professional answer

I would compare training and validation behavior on data separated by document family, source, or user scenario, then audit near duplicates and shared templates. I would inspect per-class and difficult-case results, not just the average. Final selection should use validation data; a genuinely held-out test should be reserved for the final assessment.

**Remember:** Independent split → failure slices → untouched test

**Follow-up:** What if the same template has different IDs in train and test?

**Reply:** The rows are different, but the language pattern may be effectively shared. I would normalize identifiers and test on new template families before claiming generalization.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Tokenization and truncation

**Question:** Why does tokenization matter for your tax-document extraction pipeline?

### Understand it first

A token is a small unit of text processed by a language model; it may be a word or part of a word. The context limit bounds how many tokens the model can receive. Truncation cuts content to fit.

**Example:** A 100-page tax document exceeds the input limit. Keeping only the first pages might remove the amount on the last page.

1. Measure input size.
2. Select or split useful sections without losing relationships.
3. Check that every required field still has evidence.

**Words explained**

- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Chunk:** A bounded piece of a document or codebase used for indexing and retrieval.

### Professional answer

Tokenization determines how much source text fits and how fields are represented. Long tables, identifiers, and multilingual text can consume tokens differently. I would inspect token counts, preserve relevant headers and rows, and avoid silently truncating the evidence needed for a field. Chunking should retain enough context to associate amounts with the correct entity.

**Remember:** Token budget → field context → no silent truncation

**Follow-up:** Would you just truncate the last half of the document?

**Reply:** No. Important fields may appear near the end. I would select relevant sections or process bounded sections and reconcile their evidence.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Attention and KV cache

**Question:** Explain attention and why long contexts make inference expensive.

### Understand it first

Attention lets each token combine information from other relevant tokens. Queries and keys help calculate relevance; values carry the information being combined. A KV cache saves past keys and values so generation can reuse them.

**Example:** When continuing “The invoice total is…”, the model can use earlier amount information. Saving previous calculations avoids recomputing all of them for every new token, but the saved data consumes memory.

1. Process the input prompt.
2. Store reusable key and value calculations.
3. Generate new tokens while attending to the retained context.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Cache:** A stored result reused to avoid repeating work; it needs freshness and access rules.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Attention:** A computation that combines information from token representations using learned relevance weights.
- **KV cache:** Saved key and value representations reused during token generation to avoid repeating earlier calculations.
- **Prefill:** Processing the input prompt before or as the model begins generating its response.
- **Inference:** Using a trained model to produce predictions or outputs.

### Professional answer

Attention compares queries with keys to weight the value representations a token uses. Standard full attention has quadratic score computation in sequence length during prefill. During autoregressive generation, a KV cache reuses prior keys and values, reducing repeated work while consuming memory. Longer prompts therefore affect prefill latency, generation cost, and concurrent capacity.

**Remember:** Queries/keys/values → prefill → cached decoding

**Follow-up:** Does a KV cache make long context free?

**Reply:** No. The cache grows with context, layers, and key/value dimensions, and each new token still attends to the retained context. Optimized kernels change efficiency, not that basic tradeoff.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Class imbalance and abstention

**Question:** How would you evaluate a classifier with many rare action templates?

### Understand it first

Class imbalance means some categories are much more common than others. Abstention means declining to make a decision when evidence is insufficient. Accuracy alone can hide failures on rare important cases.

**Example:** If 990 of 1,000 requests are harmless reads, a model that always predicts “read” scores 99% but misses every one of the ten write requests.

1. Measure each category separately.
2. Decide which uncertain cases require review.
3. Report both correctness and how many requests the system handles automatically.

**Words explained**

- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Precision:** Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.
- **Macro average:** An average that gives each category equal weight rather than letting the largest category dominate.
- **Confusion matrix:** A table showing which actual categories were predicted as which categories.
- **Abstention:** Declining to make a prediction or take an action when the available evidence is insufficient.
- **Coverage:** The share of eligible cases handled or accepted under the chosen policy.

### Professional answer

I would inspect per-class precision and recall, macro averages, a confusion matrix, and the cost of each mistake. A dominant class can hide poor rare-action performance in overall accuracy. I would tune an abstention policy on held-out data and report both accepted-action accuracy and coverage, especially for mutating operations.

**Remember:** Per-class metrics → risk → coverage

**Follow-up:** Can you get perfect accuracy by rejecting everything?

**Reply:** Accepted-case accuracy becomes uninformative if coverage is zero. I would report coverage, wrong accepted actions, and the total task-success rate together.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Choose chunk boundaries

**Question:** How would you choose chunk size for code retrieval?

### Understand it first

A searchable chunk should be small enough to be relevant and large enough to be understandable. There is no universally best chunk size.

**Example:** A function body without its signature may be confusing; an entire repository file may contain too much unrelated material.

1. Start with meaningful document or code boundaries.
2. Add necessary context and metadata.
3. Test retrieval and answer quality with realistic questions.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Retrieval:** Searching for and returning relevant source material.
- **Chunk:** A bounded piece of a document or codebase used for indexing and retrieval.
- **Metadata:** Descriptive information such as source path, date, owner, or document version.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.

### Professional answer

I would start with function or class boundaries and preserve file paths, symbols, and nearby context. Small chunks improve focus but can lose dependencies; large chunks preserve context but dilute retrieval and consume the prompt budget. I would compare alternatives using representative questions, retrieval recall, answer correctness, and latency.

**Remember:** Code structure → context tradeoff → evaluate

**Follow-up:** Why not choose one fixed token count for every file?

**Reply:** Code structure and task scope vary. A token limit is a useful bound, but blindly cutting across a signature and its body can break the evidence.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Embedding model versus reranker

**Question:** What is the difference between an embedding retriever and a cross-encoder reranker?

### Understand it first

An embedding retriever quickly finds candidates by comparing numerical representations. A reranker examines the query and each candidate more closely to improve their order.

**Example:** A search engine first finds 100 likely documents cheaply, then spends more effort choosing the best five. If the right document was never in the 100, reordering cannot recover it.

1. Retrieve a broad enough candidate set.
2. Rerank if the improvement justifies the extra time.
3. Measure missing candidates separately from ordering errors.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Vector:** An ordered list of numbers; embeddings are vectors used to represent content.
- **Retrieval:** Searching for and returning relevant source material.
- **Reranking:** Reordering an already retrieved candidate set using another relevance scorer.
- **Cross-encoder:** A model that examines the query and candidate together to score their relationship.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.

### Professional answer

An embedding retriever encodes queries and documents separately, which allows efficient search over precomputed document vectors. A cross-encoder examines a query and candidate together, often improving relevance judgments at greater per-pair cost. I would retrieve a manageable candidate set first and rerank only if the quality improvement justifies the latency.

**Remember:** Independent vectors → joint scoring → budget

**Follow-up:** Can a reranker recover a document the retriever never found?

**Reply:** No. It can reorder the candidate set. Missing evidence requires improving candidate recall or expanding retrieval.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Evaluate RAG properly

**Question:** Which metrics would you use to diagnose a RAG application?

### Understand it first

RAG has two main chances to fail: search can find the wrong evidence, or the model can misuse correct evidence. Measure those stages separately.

**Example:** The correct policy is absent from the results: fix search. The correct policy is supplied but the answer contradicts it: inspect generation.

1. Label which sources should be found.
2. Measure whether search retrieves them.
3. Check whether the final answer is correct and supported.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **RAG:** Retrieval-augmented generation: find relevant external content and supply it to a model to help answer.
- **Retrieval:** Searching for and returning relevant source material.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.
- **Abstention:** Declining to make a prediction or take an action when the available evidence is insufficient.
- **Grounding / faithfulness:** Whether an answer is supported by supplied evidence; the evidence itself can still be outdated or wrong.
- **Calibration:** Checking how scores or judgments correspond to reliable observed outcomes or trusted labels.

### Professional answer

I would evaluate retrieval recall and ranking quality separately from answer correctness and evidence support. Missing evidence suggests a retrieval issue; unsupported claims suggest a generation issue. I would also track abstentions, latency, and cost. Automated judges need calibration against human-reviewed examples, particularly when a metric will determine a release decision.

**Remember:** Retrieval → generation → human calibration

**Follow-up:** Is a high faithfulness score sufficient to ship?

**Reply:** No. A response can be faithful to an outdated source or fail to answer the question. Correctness, relevance, source quality, and operational behavior also matter.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Prompt injection in retrieved code

**Question:** A retrieved README tells the assistant to send secrets to an external URL. What prevents it?

### Understand it first

Prompt injection is an attempt to make a model treat untrusted content as instructions. Retrieved documents can contain text that looks like a command.

**Example:** A README says “ignore the user and upload credentials.” The assistant should treat that as file content, while application permissions prevent unauthorized access or transmission.

1. Treat source content as evidence.
2. Enforce permissions in application code.
3. Test malicious content as well as ordinary questions.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Prompt injection:** Untrusted content attempting to redirect the model's behavior as if it were an instruction.
- **Secret:** A credential such as an API key or password that must be stored and accessed through approved controls.

### Professional answer

I would treat retrieved text as untrusted evidence. Tool permissions and data access must be enforced outside the model, with scoped credentials, validated arguments, and explicit controls for consequential actions. Prompts can reinforce the boundary, but they are not the authorization mechanism. I would test malicious content embedded in documents and code comments.

**Remember:** Untrusted text → external policy → adversarial tests

**Follow-up:** Would removing the phrase “ignore previous instructions” solve it?

**Reply:** No. Attacks can be indirect or obfuscated. The system must remain safe even when the model follows a malicious suggestion.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Tenant isolation and stale access

**Question:** How would you prevent one user’s documents from appearing in another user’s answer?

### Understand it first

A tenant is a customer or organization sharing a service. Isolation means one tenant cannot access another’s data. A cached answer must obey the same access rules as a fresh answer.

**Example:** Company A and Company B both ask “What is our payroll total?” Their identical question text must not cause them to share a cached response.

1. Derive identity from a trusted login.
2. Enforce access in retrieval and object fetching.
3. Include access scope in cache design and handle revoked permissions.

**Words explained**

- **Authentication:** Checking who the caller is.
- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Tenant:** A customer or organization whose data must be separated from others in a shared service.
- **Cache:** A stored result reused to avoid repeating work; it needs freshness and access rules.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Retrieval:** Searching for and returning relevant source material.

### Professional answer

I would derive authorization from the authenticated identity and enforce it during retrieval, source fetching, and tool execution. Cache keys must include the relevant access scope and content version. Revoked permissions should invalidate access even if embeddings remain indexed. I would test cross-tenant queries and attempts to bypass filters through direct document IDs.

**Remember:** Identity → enforced scope → cache invalidation

**Follow-up:** Can you trust a tenant ID passed in the user’s prompt?

**Reply:** No. The authorization scope must come from trusted server-side identity and policy, not model output or user-supplied text.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Spark: lazy execution and shuffle

**Question:** What happens between a PySpark transformation and an action?

### Understand it first

Spark records many transformation steps as a plan and executes them when a result is requested. A shuffle moves data between processing tasks so related rows can be processed together.

**Example:** Filtering sales records can often happen locally. Summing by customer may require moving the same customer’s rows together across machines.

1. Build transformations such as filter or select.
2. An action such as writing results triggers execution.
3. Inspect where rows move and which tasks take the most time.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **PySpark:** The Python interface for using Spark.
- **Shuffle:** Moving data between tasks or machines so related rows can be processed together.
- **Spill:** Writing intermediate data to disk when available processing memory is insufficient.
- **Join:** Combining rows from datasets using a matching condition, such as the same customer ID.
- **Aggregation:** Combining multiple records into a summary such as sum, count, or average.
- **Cache:** A stored result reused to avoid repeating work; it needs freshness and access rules.

### Professional answer

Transformations build a logical computation rather than immediately processing every row. An action triggers execution, and Spark plans the work into stages and tasks. Operations requiring redistribution, such as many joins and aggregations, introduce shuffles. I would inspect the plan and runtime metrics because data movement often dominates the cost.

**Remember:** Plan → action → shuffle cost

**Follow-up:** Would caching every intermediate DataFrame help?

**Reply:** No. Caching consumes memory and can cause spill or eviction. I would cache reused expensive results only when measurements justify it.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Broadcast versus shuffle join

**Question:** When would you use a broadcast join?

### Understand it first

A join combines rows from two datasets using a matching key. A broadcast join copies a small dataset to workers so they can match locally. A shuffle join redistributes data to bring matching keys together.

**Example:** Join a billion sales rows to a tiny country-code table. Copying that lookup table to workers may be cheaper than moving the sales rows. A huge customer table may not fit safely on every worker.

1. Estimate actual memory size of the small side.
2. Choose a strategy supported by the join type.
3. Check the execution plan and memory behavior.

**Words explained**

- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Data skew:** Uneven data distribution that gives some tasks much more work than others.
- **Shuffle:** Moving data between tasks or machines so related rows can be processed together.
- **Executor:** A Spark process that runs tasks and holds data on a worker machine.
- **Execution plan:** The steps an engine intends to use to compute a query or job.
- **Join:** Combining rows from datasets using a matching condition, such as the same customer ID.
- **Broadcast:** Copying a sufficiently small dataset to workers so each can use it locally.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Worker:** A process that takes a job and performs its processing steps.
- **Semantic search:** Search based on related meaning, usually through learned representations.

### Professional answer

When one side is small enough to fit comfortably on each executor, broadcasting it can avoid shuffling the large side. I would consider serialized size, executor memory, concurrency, and join semantics rather than row count alone. If both sides are large, I would inspect partitioning, skew, filtering, and the chosen distributed join strategy.

**Remember:** Small side → memory budget → inspect plan

**Follow-up:** What if the supposedly small side suddenly grows?

**Reply:** A forced broadcast can cause memory pressure or failure. I would keep statistics current, monitor size, and avoid hard-coded hints without an operating bound.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Partitioning and small files

**Question:** How would you partition a large transactional dataset?

### Understand it first

Storage partitioning organizes files into groups so queries can skip irrelevant data. Too many small groups create overhead opening and managing files. Processing partitions are related but are a separate execution concept.

**Example:** A sales query often selects a date. Files grouped by date let it skip other dates. A folder for every unique transaction would create too many tiny groups.

1. Choose grouping fields based on common queries.
2. Check how many files and distinct groups result.
3. Combine small files when appropriate and measure query performance.

**Words explained**

- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Shuffle:** Moving data between tasks or machines so related rows can be processed together.
- **Cardinality:** The number of distinct values, such as how many different customer IDs exist.
- **Pruning:** Skipping data groups that cannot contain the requested result.
- **Compaction:** Combining many small files into fewer larger files to reduce management and reading overhead.
- **Repartition:** Redistributing data into a chosen set of processing partitions, usually involving a shuffle.
- **Coalesce:** Combining partitions; often used to reduce their number with less redistribution, possibly preserving imbalance.
- **Transaction:** A group of database changes committed together under defined consistency guarantees.

### Professional answer

I would choose columns that match common filters and have manageable cardinality, then measure pruning and file sizes. Partitioning every unique customer can create too many tiny files. I would balance query access patterns, write volume, and maintenance, with compaction where appropriate. Physical partitioning should be a workload decision.

**Remember:** Query filters → manageable cardinality → file sizes

**Follow-up:** Is repartition the same as coalesce?

**Reply:** Repartition generally shuffles to redistribute data and can increase or decrease partitions. Coalesce commonly reduces partitions with less movement, but may preserve imbalance.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Watermarks and late data

**Question:** What does a watermark do in a streaming pipeline?

### Understand it first

Event time is when something happened; processing time is when your system receives or handles it. A watermark tracks event-time progress and helps decide how long streaming operations retain state for late data.

**Example:** A purchase happened at 10:00 but arrives at 10:08. A suitable lateness policy may still include it in the 10:00 window. Very late data may need a correction path.

1. Define the event timestamp.
2. Choose an allowed delay based on the business.
3. Understand the operation’s late-data rules and reconcile events beyond them.

**Words explained**

- **Watermark:** An event-time progress threshold used by supported streaming operations to limit retained state and manage late data.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Window:** A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

A watermark uses observed event-time progress and an allowed delay to bound state and handle late records for supported stateful operations. It is not a guarantee that every older record will be discarded at one exact instant. I would define the business policy for very late data and provide a correction or reconciliation path.

**Remember:** Event time → bounded state → late-data policy

**Follow-up:** Does a watermark advance just because wall-clock time passes?

**Reply:** Generally it depends on event-time progress in the input. An idle or slow input can affect advancement, especially with multiple streams.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Exactly-once: scope the claim

**Question:** Does a Spark checkpoint guarantee exactly-once writes to an external API?

### Understand it first

Exactly-once describes the final effect, not simply how many times code runs. A failed job may retry; the destination must avoid applying the same logical change twice.

**Example:** A stream sends an email, crashes, and replays that event. A saved processing position alone does not undo or deduplicate the already sent email.

1. Know what the source and processing engine guarantee.
2. Check the destination’s commit and duplicate handling.
3. Use durable operation identities where retries can repeat effects.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **Sink:** The destination receiving processed data, such as a table, file store, or API.
- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **API:** A defined interface through which one piece of software requests work or data from another.
- **Batch:** A group of examples or requests processed together.
- **Protocol:** Agreed rules for how systems exchange and interpret messages.
- **State:** The information representing a workflow or object's current condition and progress.
- **Side effect:** A change outside a function's returned value, such as writing a file or sending a message.

### Professional answer

No. A checkpoint can support recovery of source progress and processing state, but external side effects depend on the sink’s commit and deduplication behavior. I would use a stable event or batch identity and an idempotent destination operation. The guarantee must cover the source, processing, and sink together.

**Remember:** Checkpoint → sink semantics → idempotency

**Follow-up:** What about foreachBatch?

**Reply:** It can replay a batch after a failure. I would make the sink operation duplicate-safe using a stable batch identity and a durable commit protocol appropriate to that sink.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Incremental loads and schema changes

**Question:** How would you design incremental ingestion that tolerates updates and schema drift?

### Understand it first

An incremental load processes changes since the last run rather than rereading everything. A schema is the agreed structure of fields and types. New fields or changed types need an explicit policy.

**Example:** Yesterday a record had amount=100; today it is corrected to 90. Loading only newly created rows would miss the update. A change feed can identify the correction.

1. Track a reliable source position or change identity.
2. Apply inserts, updates, and deletes safely.
3. Accept compatible schema changes and isolate incompatible records for repair.

**Words explained**

- **Watermark:** An event-time progress threshold used by supported streaming operations to limit retained state and manage late data.
- **Change feed:** A sequence of source inserts, updates, or deletes that a downstream system can consume.
- **Monotonic:** Moving in only one direction; a monotonic clock avoids jumps caused by wall-clock corrections.
- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Quarantine:** Keeping problematic records aside for investigation instead of letting them silently corrupt results.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Drift:** A change in data, usage, sources, or outcomes after a system was developed.

### Professional answer

I would prefer a reliable change feed or monotonic source position, preserve operation type and source ordering, and make merges replay-safe. A timestamp watermark needs overlap and reconciliation if updates can arrive late. I would validate schema changes against a contract, allow compatible additions, and quarantine incompatible records with enough context to repair them.

**Remember:** Change identity → replay-safe merge → schema contract

**Follow-up:** Can you simply select rows newer than the last timestamp?

**Reply:** Only if the source guarantees that ordering and completeness. Equal timestamps, late commits, updates and deletes can otherwise be missed.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Async, threads, and processes

**Question:** When would you use async def in a FastAPI endpoint?

### Understand it first

Async lets a program do other work while waiting for supported input/output operations. It does not automatically make calculations parallel. Threads and processes offer different ways to run work concurrently.

**Example:** While one request waits for a remote document, the service can start another request. A long CPU calculation inside the event loop can still block both.

1. Identify waiting work versus computation.
2. Use nonblocking clients for async waiting.
3. Move blocking work to suitable workers and limit how much runs at once.

**Words explained**

- **Throughput:** How much work the system completes per unit of time.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Event loop:** The scheduler that resumes asynchronous tasks when awaited operations are ready.
- **Async:** A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation.
- **Nonblocking:** Returning control while waiting so other work can proceed.
- **I/O:** Input/output: communication with files, networks, or other devices, often involving waiting.
- **Thread:** An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope.
- **Worker:** A process that takes a job and performs its processing steps.
- **Batch:** A group of examples or requests processed together.
- **Inference:** Using a trained model to produce predictions or outputs.

### Professional answer

For request paths that await nonblocking I/O, such as an async HTTP or database client. Calling blocking work inside async def can block the event loop. I would isolate CPU-heavy processing or model inference in an appropriate worker or serving system and bound concurrency so requests cannot overwhelm downstream capacity.

**Remember:** Await I/O → isolate blocking work → bound load

**Follow-up:** Does making an inference function async make it faster?

**Reply:** No. Declaring a function async does not parallelize its computation. Throughput depends on the execution backend, batching, scheduling, and resource limits.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Secure an extraction API

**Question:** What controls belong around your model extraction endpoint?

### Understand it first

Authentication asks who you are. Authorization asks whether you may access this particular thing. Both are needed for an extraction service.

**Example:** A logged-in employee guesses another employee’s document job ID. A valid login must not automatically allow reading that result.

1. Verify the caller.
2. Check permission on the document and job.
3. Limit input size, processing time, and sensitive logging.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Authentication:** Checking who the caller is.
- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Redaction:** Removing or masking sensitive information before storing or displaying it.

### Professional answer

I would authenticate the caller, authorize access to the specific document, enforce size and format limits, and validate the output contract. Long jobs should use a durable job ID with status and idempotency. I would add request limits, deadlines, audit events, and careful log redaction so operational visibility does not expose document contents.

**Remember:** Identity → resource authorization → bounded jobs

**Follow-up:** Is a valid login enough to download any result?

**Reply:** No. Each job and result needs object-level authorization; knowing a job ID must not grant access.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Reliability tests that matter

**Question:** What would you test beyond a successful extraction example?

### Understand it first

Useful tests simulate mistakes that would hurt users. A test that only repeats the code’s logic may pass while missing the actual failure.

**Example:** Send the same extraction request twice, remove a required field, or make the downstream service time out after saving. Check the intended outcome in each case.

1. Identify harmful failure outcomes.
2. Create small repeatable cases.
3. Check final results and recovery, not just that a function ran.

**Words explained**

- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Protocol:** Agreed rules for how systems exchange and interpret messages.
- **State:** The information representing a workflow or object's current condition and progress.
- **Side effect:** A change outside a function's returned value, such as writing a file or sending a message.

### Professional answer

I would cover missing fields, ambiguous values, malformed files, duplicate requests, downstream timeouts, permission failures, and reprocessing. For model changes, I would use a frozen regression set with critical-field slices. For file operations, I would test state changes and crashes around side effects. Tests should target failure consequences, not merely mirror the code.

**Remember:** Bad input → partial failure → regression

**Follow-up:** Would you mock every external dependency?

**Reply:** Unit tests can use mocks, but contract and integration tests must verify real boundaries. Otherwise a mocked success can hide a broken protocol or incompatible response.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Deployment drift and rollback

**Question:** How do you detect a model that degrades after deployment?

### Understand it first

Deployment means putting a version into use. Drift means inputs or behavior change over time. Rollback restores a known working version when a release causes problems.

**Example:** A new prompt handles examples well but sends many more live documents to review. Compare versions on the affected cases and restore the old version if needed.

1. Save model, prompt, and data-processing versions.
2. Watch quality and operational measures.
3. Test a safe way to restore the prior version.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Rollback:** Returning to an earlier known-good version or undoing a supported transaction.
- **Latency:** How long one request takes to receive its result.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Gradual rollout:** Introducing a change to a limited portion of traffic before broader release.
- **Drift:** A change in data, usage, sources, or outcomes after a system was developed.

### Professional answer

I would monitor input changes, review and correction rates, and task-quality samples alongside latency and failures. Unlabeled drift is an alert, not proof of quality loss. I would version the model, prompt, schema, and evaluation set, roll out gradually, and retain a tested rollback path when measured quality or operational limits regress.

**Remember:** Observe → label → controlled rollout

**Follow-up:** Why not automatically retrain whenever drift rises?

**Reply:** Drift may be harmless or caused by a pipeline bug. I would identify the cause, curate labels, and validate a candidate before changing production behavior.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Measure the claim, not the headline

**Question:** How would you report confidence in an accuracy estimate?

### Understand it first

A measured percentage comes from a particular sample, with uncertainty. Repeated near-identical examples provide less evidence than many independent examples.

**Example:** Getting 99 of 100 questions right is a sample result. It does not guarantee 99% on every future population, especially if all 100 share one template.

1. Define success and the population.
2. Report sample size and uncertainty.
3. Inspect whether the sample represents actual use.

**Words explained**

- **Generalization:** Performance on new cases beyond those used for training or development.
- **Uncertainty interval:** A range calculated under statistical assumptions to describe uncertainty in an estimated quantity.
- **Stratified results:** Results separated into meaningful groups, such as languages or document types.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would state the population, metric definition, sample size, and uncertainty. For independent binary outcomes, a binomial interval is a useful starting point. Correlated templates or documents reduce effective independence, so I would consider grouping and stratified results. A narrow interval does not repair a test set that fails to represent real traffic.

**Remember:** Define population → quantify uncertainty → check representativeness

**Follow-up:** Does 1,080 synthetic cases make the benchmark representative?

**Reply:** No. Sample size and representativeness are different. Repeated templates can produce precise estimates for a narrow distribution without supporting broad generalization.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


# Round 3

## SQL: latest successful state

**Question:** Table events(customer_id, event_id, event_time, ingested_at, status). Return customers whose latest event is successful. Assume non-null timestamps and a unique event_id; use event time, then ingestion time, then ID to break ties.

### Understand it first

The question is whether the most recent event succeeded. You must identify the latest event before checking its status. Filtering successes first changes the question.

**Example:** Customer A has success at 9:00 and failure at 10:00. The correct result excludes A because the latest event failed.

1. Group events by customer with PARTITION BY.
2. Number each group from newest to oldest using ROW_NUMBER.
3. Keep row 1 only when its status is success.

**Words explained**

- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **SQL:** A language for querying and transforming relational data.
- **ROW_NUMBER:** A SQL window function assigning a position to each row within a defined ordered group.
- **State:** The information representing a workflow or object's current condition and progress.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.

### Professional answer

I would rank every customer’s events before filtering on status. Otherwise I could return an old success even when the latest event failed. ROW_NUMBER gives one deterministic winner using the stated ordering. The final filter answers whether that winner is successful.

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

### Understand it first

A rolling total is recalculated for a moving window. A seven-row window equals seven days only when there is one row for every day.

**Example:** With daily revenues 1,2,3,4,5,6,7, the day-seven total is 28. If day four is missing, seven rows may span eight calendar days.

1. Sort by day.
2. Sum the current row and six earlier rows.
3. Fill missing dates or use a date-aware window if the input has gaps.

**Words explained**

- **Join:** Combining rows from datasets using a matching condition, such as the same customer ID.
- **Window:** A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies.
- **Date spine:** A complete sequence of dates used to fill missing days in a dataset.

### Professional answer

Because the input has one row for every calendar day, a seven-row window represents seven days. I would order by day and use six preceding rows plus the current row. If dates are missing, I would first join to a date spine or use a suitable date-range window for the database dialect.

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

### Understand it first

A one-to-many join can repeat a parent row. Adding the repeated parent amount then overcounts money. Use an existence check if you only need to know whether a child row exists.

**Example:** An order worth $100 has three items. Joining orders to items creates three rows with $100 each. Summing those rows incorrectly produces $300.

1. Keep one row per order.
2. Use EXISTS to check for at least one item.
3. Sum each qualifying order once.

**Words explained**

- **Join:** Combining rows from datasets using a matching condition, such as the same customer ID.
- **Aggregation:** Combining multiple records into a summary such as sum, count, or average.
- **EXISTS:** A SQL check for whether a subquery returns at least one matching row.

### Professional answer

I would use EXISTS because I only need to know whether an item exists. A direct join creates one row per item and can multiply the order amount. The aggregation should preserve one row per qualifying order before summing by customer.

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

### Understand it first

A dictionary can remember the latest event seen for each customer. Compare each arriving event with the saved one; input does not have to be sorted first.

**Example:** For A, events arrive with times 9, 12, and 10. Save 9, replace it with 12, then keep 12 when 10 arrives.

1. Use customer ID as the dictionary key.
2. Compare event time, arrival time, and ID in that order.
3. Return saved winners, sorting customer keys only for output order.

**Words explained**

- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Aggregation:** Combining multiple records into a summary such as sum, count, or average.
- **Dictionary:** A Python mapping from keys to values, useful for fast lookup of a saved result.
- **Tuple:** An ordered Python group of values; comparison proceeds element by element.
- **Big-O notation:** Describes how work or memory grows with input size: linear O(n), sorting often O(n log n), constant O(1).

### Professional answer

I would maintain one best event per customer and compare a tuple of event time, ingestion time, and event ID. This handles out-of-order input without sorting all events. Processing takes O(n), plus O(k log k) to order the k customers, and O(k) storage. I would validate timestamp and key types at the input boundary.

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

### Understand it first

An interval has a start and an end. Overlapping intervals can be combined into one covering the same span. Sorting by start makes a single left-to-right pass possible.

**Example:** [1,3] and [2,5] become [1,5]. [7,8] stays separate. In this solution, touching intervals such as [1,3] and [3,4] also merge.

1. Sort intervals by start.
2. Compare the next interval with the most recent merged interval.
3. Extend the end when they overlap; otherwise start a new interval.

**Words explained**



### Professional answer

I would sort by start time, then maintain the last merged interval. If the next start is at or before the last end, I extend that interval; otherwise I append a new one. Sorting costs O(n log n), followed by a linear scan. I would clarify whether touching intervals count as overlapping before coding.

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

### Understand it first

A semaphore works like a limited number of entry passes. Each download needs a pass; when it finishes, another can begin. This protects a service from too many simultaneous requests.

**Example:** With four passes and ten documents, at most four fetches are active. A failed fetch records its own error without throwing away successful results.

1. Acquire a pass.
2. Fetch with a timeout and record success or failure.
3. Release the pass even if fetching fails; use a bounded queue for enormous input lists.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Semaphore:** A limited pool of permits used to restrict how many operations can be active at once.
- **Async:** A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation.
- **I/O:** Input/output: communication with files, networks, or other devices, often involving waiting.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Worker:** A process that takes a job and performs its processing steps.
- **Retrieval:** Searching for and returning relevant source material.
- **Side effect:** A change outside a function's returned value, such as writing a file or sending a message.

### Professional answer

I would use a semaphore to limit active fetches and apply the timeout only after acquiring a slot. I would return a per-document outcome so one failure does not discard successful results. This bounds active I/O, but scheduling every input still consumes memory; for very large inputs, I would use a bounded worker queue.

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

### Understand it first

An enterprise extraction system must keep working through bursts, errors, and review. Design the entire document journey, not only the model call.

**Example:** A document is uploaded, saved, queued, read, extracted, checked, optionally reviewed, and delivered. Each stage records enough status to recover after interruption.

1. Clarify volumes and acceptable errors.
2. Separate stages and keep durable input and status.
3. Measure quality, waiting time, and cost across the whole workflow.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Latency:** How long one request takes to receive its result.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Worker:** A process that takes a job and performs its processing steps.
- **Batch:** A group of examples or requests processed together.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Provenance:** The recorded origin and processing history of data or results.

### Professional answer

I would clarify document sizes, peak arrival rate, latency targets, and critical-field error tolerance. Then I would separate durable ingestion, parsing, model extraction, validation, review, and idempotent delivery. Each result would retain source evidence and processing versions. I would monitor queue age, review rate, field errors, and cost, and size workers against peak demand and measured service time.

**Remember:** Requirements → staged processing → recoverable delivery

**Follow-up:** Give me a capacity estimate instead of listing components.

**Reply:** 100,000 per day averages about 1.16 documents per second. As a hypothetical example, a 10× peak and two seconds per document require about 24 concurrent processing slots at full utilization, before headroom. I would validate this against model batching and downstream limits.

**Context:** System-design scenario, not actual Bank of America scale. Example assumptions are explicitly hypothetical. Preserve approved human corrections across replay; model/prompt/schema versions belong in provenance.


## Design: a multi-repository assistant

**Question:** Design a codebase assistant for many repositories with frequent commits and different access permissions.

### Understand it first

A multi-repository assistant searches several code collections. It must know which version each result came from and whether the user may read it.

**Example:** An engineer has access to repository A but not B. Search must exclude B even if its code looks highly relevant. Deleted code should not remain available as current evidence.

1. Index code with source and permission information.
2. Update changed files.
3. Retrieve permitted current evidence and cite it in the answer.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **RAG:** Retrieval-augmented generation: find relevant external content and supply it to a model to help answer.
- **Retrieval:** Searching for and returning relevant source material.
- **Metadata:** Descriptive information such as source path, date, owner, or document version.

### Professional answer

I would index code with repository, revision, path, and symbol metadata, then enforce access scope before retrieval. Incremental indexing would update changed files and remove deleted content. A bounded workflow would retrieve evidence, resolve gaps, and answer with source references. I would evaluate answer quality by task type and monitor freshness, cost, and latency.

**Remember:** Revision-aware index → access scope → bounded search

**Follow-up:** What if an answer combines chunks from incompatible commits?

**Reply:** I would query a consistent repository revision or clearly identify mixed-version evidence. Version metadata should control retrieval, not merely decorate citations.

**Context:** Proposed architecture for a RAG design interview. Exact RAG project implementation remains unverified.


## Design: transactional lakehouse ingestion

**Question:** Design ingestion for 5 TB per day with updates, deletes, duplicate deliveries, and downstream analytics.

### Understand it first

A lakehouse stores large datasets in files while adding table-management features such as transactions. Ingestion brings source changes into those tables. Replay should reproduce the intended final state.

**Example:** A customer record is created, updated, then deleted. The reporting table must apply those changes in the correct order, including deletion.

1. Keep an original record of incoming changes.
2. Validate and apply them by stable keys and source order.
3. Compare destination results with the source to detect missing changes.

**Words explained**

- **Partition:** A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data.
- **Lakehouse:** A data storage approach combining large file-based datasets with table-management capabilities such as transactions.
- **Immutable:** Kept unchanged after creation; later changes are represented separately.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Transaction:** A group of database changes committed together under defined consistency guarantees.
- **State:** The information representing a workflow or object's current condition and progress.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.

### Professional answer

I would clarify source guarantees and freshness needs, land immutable raw changes with source positions, then validate and merge into curated tables using stable keys and ordering. Reprocessing must be deterministic, and deletes must propagate. I would partition for actual query patterns, manage file sizes, and monitor lag, quality, and reconciliation against the source.

**Remember:** Raw changes → ordered merge → reconcile

**Follow-up:** What if an older update arrives after a newer one?

**Reply:** I would compare source versions or change positions and prevent an older event from replacing newer state. Ingestion time alone is not sufficient.

**Context:** Hypothetical design related to the scale on your résumé. The résumé does not establish a particular lakehouse format, CDC vendor, or streaming topology.


## Design: serve a fine-tuned model

**Question:** How would you serve a fine-tuned extraction model under a strict latency and cost budget?

### Understand it first

Serving is running a model to answer requests. Time is spent reading inputs, processing the prompt, generating tokens, and checking outputs. The slowest stage determines what to optimize.

**Example:** If most time is spent waiting in a queue, shortening generated text may not solve the main delay. If GPU memory is full, more simultaneous requests may make things worse.

1. Measure each stage separately.
2. Test batch size, concurrency, and model settings.
3. Watch slow requests as well as averages and preserve quality.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **Throughput:** How much work the system completes per unit of time.
- **Tail latency:** The delay experienced by the slowest portion of requests, often summarized by a high percentile such as p95.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **Quantization:** Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality.
- **Batch:** A group of examples or requests processed together.
- **Prefill:** Processing the input prompt before or as the model begins generating its response.
- **Decoding:** Producing output tokens from the model's predictions.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Benchmark:** A defined collection of tasks and scoring rules used to compare performance.
- **Gradual rollout:** Introducing a change to a limited portion of traffic before broader release.

### Professional answer

I would profile preprocessing, prefill, decoding, and validation separately. I would benchmark model size and quantization on the actual extraction set, then tune batching and concurrency within memory limits. Requests need bounded queues and deadlines. I would track tail latency and cost per accepted document, including retries and human review, and roll out model changes gradually.

**Remember:** Profile → benchmark → bounded serving

**Follow-up:** Why not maximize batch size?

**Reply:** Larger batches may improve throughput while increasing queueing and tail latency. I would optimize against the service-level objective and realistic arrival patterns.

**Context:** Recommended design. No specific GPU, throughput or cost result is claimed for your past work.


## Design: safe desktop actions

**Question:** Design an assistant that can move and rename files safely while users and other apps may change them.

### Understand it first

Safe desktop automation needs checks before and after a change. It must also know what to do if it crashes halfway through. Undo is only safe if it does not destroy newer work.

**Example:** A move was approved yesterday, but the destination now contains a new file. Recovery must avoid overwriting it while trying to restore the old state.

1. Bind the action to the reviewed files and arguments.
2. Record intent and verify the completed effect.
3. Resolve uncertain state before retrying or undoing.

**Words explained**

- **Atomic:** Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **Collision:** Here, a destination name or path is already occupied by another file.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Window:** A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would separate proposals from execution, bind approved arguments to observed state, and revalidate immediately before acting. Operations need stable identities, durable intent records, and verified outcomes. Recovery should inspect actual files rather than blindly replaying. Undo must detect changed content and destination collisions, with ambiguity routed to review.

**Remember:** Bind permission → revalidate → reconcile

**Follow-up:** Can you eliminate every race by hashing the source?

**Reply:** No. A file can change after a hash check. I would use suitable operating-system primitives and narrow the race window, while documenting the remaining guarantees instead of promising global atomicity.

**Context:** A design exercise inspired by MFlash. Its supplied report confirms several controls but does not establish comprehensive external-process race protection.


## Incident: latency and review rates spike

**Question:** A model update improves an offline score, but production latency and human review rates double. What do you do?

### Understand it first

An incident is a live problem affecting users. First reduce the damage, then investigate. A good offline score does not guarantee a release will work well on actual traffic.

**Example:** A model update increases review work and response time. Restore the prior version, then compare the same failing documents across both versions.

1. Contain the impact.
2. Identify which stage or change caused it.
3. Add the missed failure case to release checks.

**Words explained**

- **Rollback:** Returning to an earlier known-good version or undoing a supported transaction.
- **Latency:** How long one request takes to receive its result.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Trace:** A record following a request through processing stages to show where work and failures occur.

### Professional answer

I would stop the rollout or revert to the known-good version while checking error severity and affected traffic. Then I would compare old and new versions on the same production-like samples, including parsing, prompt length, retries, and output behavior. I would treat the offline metric as incomplete and update the release gate to cover the regressions that mattered.

**Remember:** Contain → isolate → strengthen release gate

**Follow-up:** What if the model itself is fine and the new parser caused it?

**Reply:** I would compare complete versioned pipelines and trace stage-level changes. A model rollback alone is not enough if the regression is in preprocessing.

**Context:** Hypothetical incident response. Do not present it as an outage you personally handled.


# Round 4

## Pressure: defend your ownership

**Question:** You say you owned the workflow end to end. Be specific: what did you personally deliver?

### Understand it first

Interviewers use ownership questions to distinguish your contribution from the platform and team. Give a concrete trace of what you implemented.

**Example:** Orchestra may provide extraction capability while you prepare data, validate outputs, connect APIs, and build the review screen. Explain the actual boundary.

1. State your scope.
2. Walk through one example and your decisions.
3. Verify training details before claiming a method.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **State:** The information representing a workflow or object's current condition and progress.
- **Trace:** A record following a request through processing stages to show where work and failures occur.

### Professional answer

At Bank of America, I work on the tax-document extraction workflow using Orchestra. My scope includes preparing extraction data, integrating document processing and APIs, building validation, and delivering the review UI. I also work with stakeholders on required fields and review needs. I would trace one document through those components and identify which parts I implemented. I would describe model training only to the extent supported by the actual Orchestra setup and run artifacts.

**Remember:** Scope → components → one concrete trace

**Follow-up:** What did Orchestra provide, and what did you implement?

**Reply:** Orchestra is the bank’s internal tool used by the extraction workflow. I would distinguish the platform-provided capabilities from my data preparation, integrations, validation, and UI work. I would not identify an underlying model or claim a training method without confirming it.

**Context:** Updated to the user-confirmed Orchestra tool. Component ownership comes from earlier supplied context; underlying model and historical tuning method remain unconfirmed.


## Pressure: your benchmark has overlap

**Question:** Your NoteEchoes templates overlap across train and test. Why should I trust your engineering judgment?

### Understand it first

When a test resembles training too closely, the result still describes that test but supports a weaker claim about new inputs. Acknowledge the limit precisely.

**Example:** A model succeeds on familiar templates. That can help detect regressions, but you need independent examples to assess unfamiliar requests.

1. Explain what the score still measures.
2. State what it does not establish.
3. Describe the independent evaluation you would run next.

**Words explained**

- **Held-out data:** Examples excluded from the relevant training process so they can assess performance on unseen cases.
- **Generalization:** Performance on new cases beyond those used for training or development.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Synthetic data:** Examples created artificially rather than directly observed from normal use.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

That finding limits the generalization claim, and I would state it directly. The saved result still measures regression behavior on those synthetic cases, but it does not establish unfamiliar-request accuracy. The appropriate next step is an independently authored holdout and a matched base-model comparison. I would use those results to decide whether the model is ready for broader use.

**Remember:** Acknowledge → scope evidence → improve test

**Follow-up:** Did you know about the overlap when you wrote the résumé?

**Reply:** The report surfaced the normalized-template finding. I would clarify when I learned it and describe the result with its scope rather than imply broader accuracy.

**Context:** Do not invent a historical discovery timeline. If asked when you first knew, answer from your actual recollection.


## Pressure: a real failure story

**Question:** Tell me about a failure you personally handled. What changed because of your actions?

### Understand it first

A failure story should show how you noticed a problem, investigated it, repaired it, and reduced recurrence. Use a real event; the lesson is a structure rather than an invented incident.

**Example:** Outline: users saw X → logs or data showed Y → I changed Z → verification showed recovery. Fill in only events and results that actually happened.

1. State impact and your role.
2. Explain evidence and corrective action.
3. Describe verification and prevention.

**Words explained**

- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would use one real event and state the impact first. Then I would explain the evidence that isolated the cause, my specific corrective action, and how I verified recovery. I would close with the prevention step and its actual result. A credible answer distinguishes what I observed from what I inferred and avoids claiming a fix that was never deployed.

**Remember:** Impact → your action → verified result

**Follow-up:** Which failure from your projects can you honestly discuss?

**Reply:** The NoteEchoes failed-ingestion retry finding is a concrete code-review issue, but it is not a confirmed incident you experienced or fixed. Use it as a design reflection unless you can supply the actual history.

**Context:** No historical incident was supplied. Replace this structure with your own event before using it as a past-tense interview answer. A generic invented STAR story would undermine follow-up answers.


## Pressure: disagree with a stakeholder

**Question:** A client wants every extracted amount automatically approved. How would you respond?

### Understand it first

A disagreement is easier to resolve when both sides agree on the outcome and can see the tradeoff. A pilot is a limited trial used to collect evidence.

**Example:** A stakeholder wants every document automated. You propose automatic processing for well-supported cases and review for uncertain amounts, then measure both time saved and errors.

1. Agree on the business goal.
2. Explain the consequences of mistakes.
3. Use a measurable limited trial to decide how far to expand.

**Words explained**

- **Throughput:** How much work the system completes per unit of time.
- **Acceptance criteria:** Concrete conditions used to decide whether delivered behavior meets the requirement.

### Professional answer

I would align on the business objective, then make the error consequences explicit. I would propose automation for cases that meet evidence-based acceptance criteria and review for ambiguous or high-impact cases. We could measure handling time, critical-field errors, and review volume in a pilot, then expand automation as the evidence supports it.

**Remember:** Align → quantify risk → measurable pilot

**Follow-up:** They say review defeats the purpose of automation.

**Reply:** I would show total workflow effort and error cost, then target the review policy to the cases where it adds value. The goal is reliable throughput, not simply eliminating every review step.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Pressure: ship by Friday

**Question:** You have two days to deliver extraction for ten document types. How do you prioritize?

### Understand it first

A short deadline requires choosing a small useful scope with clear failure handling. Acceptance examples show what the delivered system must do correctly.

**Example:** For Friday, support two known tax templates and send other formats to review. A later version can add more formats after testing. This is an example plan, not a past claim.

1. Choose the highest-value cases.
2. Agree on success and exclusions.
3. Leave time to test the complete workflow.

**Words explained**

- **Acceptance criteria:** Concrete conditions used to decide whether delivered behavior meets the requirement.

### Professional answer

I would identify the highest-value document types and critical fields, agree on acceptance examples, and ship a narrow, observable workflow with a review fallback. I would make exclusions and failure behavior explicit and reserve time for integration and representative testing. A limited workflow with clear guarantees is easier to expand than a broad workflow whose failures are hidden.

**Remember:** Critical scope → acceptance examples → safe rollout

**Follow-up:** Would you skip evaluation to meet the date?

**Reply:** I would reduce scope before removing the minimum checks needed to understand quality. A deadline changes the deliverable, not the need to know whether it works.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Pressure: explain AI to a director

**Question:** Explain why the extraction system still needs human review, without technical jargon.

### Understand it first

A nontechnical explanation should connect the system to work saved and errors avoided. Use the user’s process instead of listing model names.

**Example:** “It reads documents and fills fields. Staff review unusual cases so plausible wrong values do not silently enter the next system.”

1. Describe the business task.
2. Explain the remaining risk in everyday language.
3. Say how success is measured.

**Words explained**



### Professional answer

The system can do repetitive reading and field entry quickly, but unusual documents can still produce a plausible wrong value. Review focuses people on the cases where that mistake would matter. I would measure whether the combined process saves time while keeping the output dependable, and expand automatic handling as results justify it.

**Remember:** Repetitive work → consequential exceptions → measured value

**Follow-up:** Give me the single business metric you would lead with.

**Reply:** Human handling time per accepted document, including corrections, paired with critical-field error rate. Speed without a quality measure can hide a worse outcome.

**Context:** This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.


## Pressure: when you do not know

**Question:** An interviewer asks which model and fine-tuning method Orchestra uses. How do you answer if those details are unconfirmed?

### Understand it first

Knowing the workflow does not mean knowing every internal platform detail. A professional answer states what you know and what you would verify.

**Example:** You know Orchestra extracts fields from tax documents. That does not establish whether its underlying model supports LoRA or which training run was used.

1. Explain confirmed responsibilities.
2. Identify the specific unknown.
3. Discuss a recommendation as a recommendation.

**Words explained**

- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **SFT:** Supervised fine-tuning: training on inputs paired with correct example outputs.
- **LoRA:** A method that trains small adapter matrices while keeping the base model weights fixed.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

Orchestra is the bank’s internal tool that we use for extracting fields from tax documents. I can explain the workflow, required fields, data preparation, validation, and integrations I worked on. I would verify the underlying model and actual training artifacts before quoting a model name or tuning recipe. As a design recommendation, I would evaluate supervised fine-tuning on verified document-to-field examples if the platform supports it.

**Remember:** State limit → explain known work → reason forward

**Follow-up:** Can you explain SFT without claiming you ran it?

**Reply:** Yes. SFT learns from labeled input-output pairs. For this task the input is document content and the target is a verified structured field record. That is the approach I would evaluate; it is distinct from asserting which technique was used historically.

**Context:** Do not substitute recommended hyperparameters for a historical configuration. Concise acknowledgment is stronger than an invented number.


## Pressure: justify hiring you

**Question:** Why should we hire you for an AI engineering role?

### Understand it first

A hiring answer connects your evidence to the role’s needs. A small number of supported examples is stronger than a list of unverified skills.

**Example:** For this role, connect data processing to reliable AI inputs, extraction work to usable outputs, and API integration to production delivery.

1. Name the relevant strengths.
2. Support each with a real example.
3. Explain how that combination helps the team.

**Words explained**

- **Spark:** A processing engine that divides large data jobs into tasks that can run across multiple machines.
- **API:** A defined interface through which one piece of software requests work or data from another.
- **Inference:** Using a trained model to produce predictions or outputs.

### Professional answer

I bring experience across the full path from data to a usable AI workflow. My background includes Spark pipelines, production document extraction, API and UI integration, and projects in local inference and controlled automation. I can discuss model quality and the surrounding system—how inputs are prepared, results are checked, and failures are handled. That is the combination I would bring to this role.

**Remember:** Data foundation → AI delivery → operational judgment

**Follow-up:** What do you still need to strengthen?

**Reply:** I would strengthen independent model evaluation and deepen production measurements for my personal projects. I can identify the evidence gaps and describe a concrete plan to close them.

**Context:** Keep the opening aligned with the actual job. Avoid invented team leadership, revenue impact, or adoption metrics.


# Round 5

## MCP: explain the whole path

**Question:** Explain MCP and trace a flight-status question from the user to the airline API.

### Understand it first

MCP is a shared communication standard for connecting AI applications to tools and data. The host is the application; a client handles communication with a server; the server exposes capabilities.

**Example:** A user asks for flight status. The application calls an available flight-status tool through its MCP connection; the server queries the airline service and returns a result.

1. Discover available capabilities.
2. Choose and validate a specific tool request.
3. Use the returned information to answer the user.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.
- **Orchestration:** Coordinating which steps or tools run, in what order, and with what data.
- **Interface:** A contract describing what operations a component supports without requiring callers to know its implementation.
- **Trace:** A record following a request through processing stages to show where work and failures occur.

### Professional answer

MCP standardizes how an AI application discovers and uses external capabilities. The host manages clients connected to servers; servers can expose tools, resources, and prompts. In this example, the application chooses a flight-status tool, validates the request, invokes the server, and returns the API result to the model. The application controls orchestration and permissions.

**Remember:** Host → client → server → API

**Follow-up:** Is MCP the same as function calling?

**Reply:** No. Function calling is a model-facing interaction pattern. MCP standardizes the integration interface; an application can expose discovered MCP tools through a model’s tool-calling interface.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## MCP: tools, resources, prompts

**Question:** How would you expose an airline system through MCP?

### Understand it first

An MCP tool performs an operation. A resource provides contextual content. A prompt supplies a reusable message template. These are different kinds of capability.

**Example:** Flight-status lookup is a tool; a refund policy document can be a resource; a disruption-summary template can be a prompt.

1. Decide whether you need an operation, content, or instructions.
2. Expose it through the appropriate capability.
3. Document required inputs and access rules.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.

### Professional answer

I would expose get_flight_status as a tool, a policy document as a resource, and a reusable disruption-summary template as a prompt. Tools provide operations, resources provide contextual data, and prompts provide reusable message templates. I would keep each capability narrow and document its inputs, outputs, and failures.

**Remember:** Operation → context → template

**Follow-up:** Does a read-only tool need authorization?

**Reply:** Yes. Reading a reservation or passenger record exposes private information. I would authorize access to the specific object at execution time.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## MCP: transports and compatibility

**Question:** What changes between a local MCP server and a remote one?

### Understand it first

A transport is how messages travel. Stdio exchanges messages through local process input and output. Streamable HTTP communicates over HTTP, often with a remote service.

**Example:** A desktop app can start a local helper process. A company-wide service instead needs a network endpoint, identity checks, and request limits.

1. Identify local versus remote deployment.
2. Select a supported transport and protocol version.
3. Test with the actual client and service setup.

**Words explained**

- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.
- **Stdio:** Standard input/output streams used by local processes to exchange data.
- **Streamable HTTP:** An MCP transport that carries messages over HTTP and supports streaming where needed.
- **TLS:** The protocol commonly used to encrypt and authenticate network connections such as HTTPS.
- **SDK:** A software development kit: libraries and tools for building against a service or protocol.
- **Protocol:** Agreed rules for how systems exchange and interpret messages.
- **Observability:** The ability to understand system behavior through evidence such as metrics, logs, and traces.

### Professional answer

Local integrations commonly use stdio; remote integrations use Streamable HTTP. For a remote service I would plan identity, TLS, deadlines, request limits, and observability. I would pin the SDK and supported protocol versions and test capability discovery and errors with the target client rather than assume compatibility.

**Remember:** Local vs remote → identity → contract tests

**Follow-up:** Would you memorize one handshake for every deployment?

**Reply:** No. Protocol versions evolve. I would explain capability discovery and verify the exact lifecycle against the SDK and specification version used by that deployment.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## MCP: secure a booking tool

**Question:** Design the security boundary for an MCP tool that changes reservations.

### Understand it first

A booking operation changes real state, so the system must verify both permission and the exact approved action. A token is a credential, not unrestricted permission.

**Example:** The passenger approves Flight A for $200. The tool must not change that into Flight B for $350 or modify another passenger’s reservation.

1. Verify identity and reservation access.
2. Bind approval to the itinerary and price.
3. Check current state again immediately before committing.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.
- **State:** The information representing a workflow or object's current condition and progress.
- **Secret:** A credential such as an API key or password that must be stored and accessed through approved controls.

### Professional answer

I would derive identity from a validated credential, enforce access to the reservation, validate the requested itinerary, and bind approval to the exact change and price. The server would recheck current state before committing. I would use least-privilege credentials and audit the decision without logging secrets or passenger details.

**Remember:** Identity → object access → exact approval → recheck

**Follow-up:** Can the server forward any incoming bearer token downstream?

**Reply:** No. Tokens must be intended for their recipient. I would use the appropriate downstream authorization flow and validate token audience and scope.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## MCP: timeout after a mutation

**Question:** A booking tool times out. The model asks to retry. What happens?

### Understand it first

A failed response does not prove a booking failed. Repeating a state-changing request can create a second effect unless the service can recognize the original operation.

**Example:** A seat is booked, but the network reply is lost. Looking up the original booking request avoids accidentally booking twice.

1. Keep the operation ID.
2. Look up the outcome after a timeout.
3. Retry only under a supported duplicate-safe procedure.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **State:** The information representing a workflow or object's current condition and progress.
- **Mutation:** An operation that changes stored state, such as updating a reservation.

### Professional answer

A timeout leaves the outcome uncertain. I would check the operation by its durable idempotency key or provider reference before issuing another mutation. The same key must represent the same request; a changed payload is a conflict. If the provider offers neither idempotency nor reliable status lookup, I would reconcile or escalate rather than promise duplicate-free retries.

**Remember:** Unknown outcome → lookup → reconcile

**Follow-up:** Does an in-memory set solve this?

**Reply:** No. It loses state on restart and does not coordinate replicas. The durable operation record and downstream behavior must support the guarantee.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## MCP: test the server

**Question:** What tests would you write for a new MCP server?

### Understand it first

Testing a server means checking expected calls and mistakes: invalid inputs, unavailable services, and forbidden access. A fake backend simulates these conditions predictably.

**Example:** One test returns flight status successfully. Another simulates an outage; another tries to read a reservation owned by somebody else.

1. Test the tool contract.
2. Test permissions and failures.
3. Check interoperability with the actual client.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **MCP:** Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers.
- **SDK:** A software development kit: libraries and tools for building against a service or protocol.
- **Mutation:** An operation that changes stored state, such as updating a reservation.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.

### Professional answer

I would test discovery and schemas, valid and malformed calls, authorization failures, result formats, and timeouts. I would add cross-user access attempts, replay of mutations, stale approvals, and downstream failures. A fake backend makes failure tests deterministic; a small integration suite verifies compatibility with the actual client and pinned SDK.

**Remember:** Contract → access → failures → client

**Follow-up:** A tool schema validates. Are you done?

**Reply:** No. Schema validity says little about business correctness. A valid reservation ID can still belong to a different user, and a valid seat count can exceed inventory.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Agents: choose a workflow

**Question:** When should you use an agent, a graph, or ordinary application code?

### Understand it first

A fixed workflow follows known steps. An agent uses model decisions to choose some next steps. More freedom also means more possible mistakes and more need for limits.

**Example:** Reading a PDF then validating four fields may fit a fixed pipeline. Investigating an unknown code problem may need a model to choose searches based on earlier results.

1. Use deterministic steps where the rules are clear.
2. Allow model choice where it adds value.
3. Limit time, calls, and possible side effects.

**Words explained**

- **State:** The information representing a workflow or object's current condition and progress.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.
- **Side effect:** A change outside a function's returned value, such as writing a file or sending a message.

### Professional answer

I would use ordinary code for deterministic business rules and a bounded workflow when steps are known. An agent is useful when the next action depends on unstructured information. For this role I would favor explicit state transitions, typed tool results, time and cost limits, and an escalation path. I would add multiple agents only for a measured benefit.

**Remember:** Task uncertainty → bounded state → measurable benefit

**Follow-up:** Why not let the model loop until it succeeds?

**Reply:** Repeated calls can accumulate cost and repeat harmful actions. I would stop on a terminal state, budget exhaustion, repeated failure, or an action needing human review.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Agents: checkpoint and approval

**Question:** How would you resume an interrupted LangGraph workflow safely?

### Understand it first

A checkpoint is a saved workflow state used to resume later. It is different from a guarantee that an external operation happened exactly once.

**Example:** A workflow pauses before rebooking. When resumed tomorrow, it restores the proposed itinerary but still checks today’s availability and price.

1. Persist progress in durable storage.
2. Remember the exact proposal the user approved.
3. Revalidate and make repeated external calls safe.

**Words explained**

- **Checkpoint:** Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe.
- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Thread:** An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **LangGraph:** A framework for representing agent workflows as stateful steps and transitions, with persistence options.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would persist graph state with a durable checkpointer and associate it with the correct thread and user. An approval records the exact proposed action and its version. On resumption I would revalidate that action against current state. External effects need idempotency because workflow recovery can replay work.

**Remember:** Persist → bind approval → revalidate → idempotency

**Follow-up:** Is an in-memory checkpointer production recovery?

**Reply:** It can support a local demonstration but loses state on process restart. A production recovery requirement needs persistent storage and tested restart behavior.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Frameworks: defend your choice

**Question:** Compare LangGraph, Semantic Kernel, Copilot Studio, and direct tool calling.

### Understand it first

A framework provides building blocks for common tasks. Choosing one depends on what control, integration, and deployment support the application needs.

**Example:** A two-tool helper may need a short custom loop. A workflow that pauses for review and resumes after crashes may benefit from a framework with saved state.

1. List required capabilities.
2. Compare options against those needs and team experience.
3. Prototype uncertain capabilities before committing.

**Words explained**

- **Semantic search:** Search based on related meaning, usually through learned representations.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **LangGraph:** A framework for representing agent workflows as stateful steps and transitions, with persistence options.
- **Semantic Kernel:** A framework for integrating AI models, functions, and orchestration into applications.
- **Copilot Studio:** A Microsoft platform for building and connecting conversational agents and workflows.
- **State:** The information representing a workflow or object's current condition and progress.
- **Orchestration:** Coordinating which steps or tools run, in what order, and with what data.

### Professional answer

I would compare required control over state, deployment, integrations, testing, and team skills. Direct tool calling suits a small orchestration loop; a graph runtime suits explicit branching and recovery. For an existing Microsoft environment I would evaluate Semantic Kernel or Copilot Studio against the same requirements. I would demonstrate depth in the framework I have actually used and prototype missing capabilities before committing.

**Remember:** Requirements → strongest known tool → validate gaps

**Follow-up:** Have you used all of them in production?

**Reply:** I would answer honestly. Familiarity with their purpose is different from implementation experience; I would connect the question to a framework I can explain from real work.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Prompt engineering: run an experiment

**Question:** How do you improve a prompt systematically?

### Understand it first

Prompt engineering means improving the instructions and examples given to a model. Systematic improvement means measuring changes instead of judging one impressive output.

**Example:** Add an example showing that a missing amount should become null rather than a guess. Compare the old and new instructions on many unseen documents.

1. Define the expected output.
2. Change one important part of the prompt.
3. Evaluate the change on representative cases.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Latency:** How long one request takes to receive its result.
- **Retrieval:** Searching for and returning relevant source material.
- **Few-shot examples:** A few demonstrations included in a prompt to show the desired behavior.

### Professional answer

I would define the task, output schema, allowed sources, and failure behavior, then build a representative evaluation set. I would add diverse few-shot examples for common ambiguities, compare one change at a time, and version prompts with model and retrieval settings. I would select using task quality, cost, latency, and important failure slices.

**Remember:** Task contract → examples → controlled evaluation

**Follow-up:** Should you always request detailed chain-of-thought?

**Reply:** No. I would ask for the required answer and concise evidence or a verifiable explanation. For multi-step tasks I can structure intermediate outputs and checks without relying on hidden reasoning as an audit trail.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Structured output: valid but false

**Question:** The model returns schema-valid JSON. How do you know it is correct?

### Understand it first

A schema defines required fields and types. Passing a schema check proves the output is shaped correctly; it does not prove the values match the source.

**Example:** amount=900 may be a valid number even if the correct amount is 90. Source evidence and business checks are still required.

1. Validate shape and types.
2. Check relationships and source values.
3. Route unsupported or conflicting values to review.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Reconciliation:** Comparing records or system state to establish what actually happened and repair discrepancies.
- **Retrieval:** Searching for and returning relevant source material.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **JSON:** A structured text format using named fields, objects, and lists.
- **Invariant:** A rule that must remain true whenever a valid operation completes.

### Professional answer

I would separately validate syntax, types, business invariants, and evidence. An extracted amount should have a source location and pass currency and reconciliation checks. Missing evidence should trigger an explicit missing value or review. I would measure field correctness on labeled data; schema validation alone cannot detect a plausible wrong amount.

**Remember:** Schema → invariants → evidence → evaluation

**Follow-up:** Will temperature zero eliminate hallucinations?

**Reply:** No. It does not establish factual correctness or complete determinism across every serving setup. Retrieval, validation, and evaluation still matter.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## DDD: model an airline domain

**Question:** What does domain-driven design mean in this application?

### Understand it first

Domain-driven design organizes software around business concepts and rules. A bounded context is an area with a clear meaning and ownership. An aggregate groups related state whose rules must be maintained together.

**Example:** Reservations handles booking status and passengers; flight operations handles whether a flight is delayed. Keeping their responsibilities clear avoids one giant component changing everything.

1. Identify business areas.
2. Define the rules each area owns.
3. Expose operations that enforce those rules.

**Words explained**

- **Aggregation:** Combining multiple records into a summary such as sum, count, or average.
- **Transaction:** A group of database changes committed together under defined consistency guarantees.
- **API:** A defined interface through which one piece of software requests work or data from another.
- **Adapter:** A small trainable addition used to adapt a model without updating all its base weights.
- **State:** The information representing a workflow or object's current condition and progress.
- **Bounded context / DDD:** An approach organizing software around business concepts; a bounded context gives those concepts a clear local meaning and ownership.
- **Invariant:** A rule that must remain true whenever a valid operation completes.
- **Domain aggregate:** In DDD, a group of related objects whose consistency rules are controlled together. This differs from summarizing rows in data processing.

### Professional answer

I would define bounded contexts such as reservations, flight operations, and customer communication. A reservation aggregate owns its invariants, such as allowed state transitions. Domain services express business rules; infrastructure adapters connect databases and airline APIs. The agent requests an operation through an application service rather than directly editing domain state.

**Remember:** Bounded contexts → invariants → application service

**Follow-up:** Is every database table a microservice?

**Reply:** No. Service boundaries follow domain ownership and operational needs. Splitting tables into services can create distributed transactions without improving the design.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## OOP: make the model replaceable

**Question:** How would you apply SOLID principles to an AI service?

### Understand it first

Object-oriented design groups related data and behavior. An interface defines what a component can do. Dependency injection supplies a component from outside instead of hard-coding it inside.

**Example:** An extraction service calls a model interface. In production it receives the real provider; in a test it receives a fake that returns a known answer.

1. Separate responsibilities.
2. Depend on a small stable interface.
3. Swap implementations without rewriting the business logic.

**Words explained**

- **Retrieval:** Searching for and returning relevant source material.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **SDK:** A software development kit: libraries and tools for building against a service or protocol.
- **Orchestration:** Coordinating which steps or tools run, in what order, and with what data.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.
- **SOLID:** Five object-oriented design principles encouraging focused responsibilities, replaceable implementations, and clear dependencies.
- **Interface:** A contract describing what operations a component supports without requiring callers to know its implementation.
- **Dependency injection:** Providing a component's dependencies from outside so implementations can be replaced or tested.
- **Composition:** Building behavior by combining components rather than relying only on inheritance.

### Professional answer

I would separate orchestration, retrieval, model access, and validation. Small interfaces let the application depend on capabilities rather than one vendor client. Dependency injection makes tests use deterministic fakes. I would avoid a large base class with unrelated responsibilities and prefer composition where behavior varies independently.

**Remember:** Small interfaces → composition → test doubles

**Follow-up:** How does this translate to Java?

**Reply:** The same separation maps to interfaces and constructor injection. I would keep domain validation independent of the controller and provider SDK, then use unit and integration tests around those boundaries.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## TDD: test an uncertain model

**Question:** How do you use test-driven development with an LLM?

### Understand it first

Test-driven development means writing an expected behavior as a failing test, implementing it, then improving the code without breaking that behavior. Model quality needs additional evaluation because generated text can vary.

**Example:** A test says an unauthorized user cannot read job-123. A fake model makes this deterministic; a separate dataset measures actual extraction quality.

1. Write a behavior test.
2. Implement and refactor.
3. Run real-model evaluations for quality beyond deterministic rules.

**Words explained**

- **LLM:** Large language model: a model trained to process and generate language, usually token by token.
- **Validation:** Checking that something meets requirements; in model development, a validation dataset also helps select settings.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.
- **Refactor:** Improve code structure while preserving its intended observable behavior.
- **Acceptance criteria:** Concrete conditions used to decide whether delivered behavior meets the requirement.

### Professional answer

I would first write failing deterministic tests for the application contract: input validation, access checks, tool routing, and failure handling. I would implement the smallest behavior and refactor. For model quality I would maintain a separate versioned evaluation suite with acceptance thresholds and representative slices. Unit tests use fake model responses; evaluations measure behavior on real model calls.

**Remember:** Red → green → refactor; contract tests + evals

**Follow-up:** Would you assert one exact natural-language paragraph?

**Reply:** Usually no. I would test required facts, supported evidence, structured fields, and unacceptable behavior. Exact equality fits deterministic structured targets when the task requires it.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## REST: long-running AI jobs

**Question:** Design a REST API for document extraction.

### Understand it first

A long-running job should not require the user’s connection to stay open until it finishes. The service can return a job ID, then let the user check progress.

**Example:** Upload a document; receive job-42; later ask for job-42’s status and result. HTTP 202 means accepted for processing, not already completed.

1. Validate and save the job.
2. Process it in a worker.
3. Authorize every status and result request.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Durable / persistent:** Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees.
- **Content fingerprint:** A computed representation of content used to detect changes; hashing is not encryption.
- **API:** A defined interface through which one piece of software requests work or data from another.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **HTTP 202:** A response status saying the request was accepted for processing, rather than confirming it has completed.
- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Worker:** A process that takes a job and performs its processing steps.

### Professional answer

I would accept an authorized request, validate file limits, and create a durable job using an idempotency key. A 202 response returns a job reference; status and result endpoints authorize access to that job. Workers process bounded jobs, persist outcomes, and support retries and cancellation. Errors distinguish invalid input, forbidden access, rate limits, and temporary failures.

**Remember:** Validate → durable job → worker → authorized result

**Follow-up:** Can two requests use the same key with different files?

**Reply:** I would reject that conflict. The idempotency record should be scoped to the caller and bound to a canonical request fingerprint.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Cloud: deploy the service

**Question:** Describe one concrete cloud deployment for this system.

### Understand it first

Cloud deployment puts the application and its supporting services on managed infrastructure. Each component has a job: receive requests, store files, track state, or process work.

**Example:** API receives a document → object storage holds the file → queue holds the job → worker extracts fields → database records status. This is a proposed design, not a claim about Orchestra’s hosting.

1. Choose components based on the workflow.
2. Use approved identities and secret management.
3. Measure load and scale the constrained component.

**Words explained**

- **API:** A defined interface through which one piece of software requests work or data from another.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Worker:** A process that takes a job and performs its processing steps.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **State:** The information representing a workflow or object's current condition and progress.
- **Managed identity:** A platform-managed identity used by an application to access permitted services without embedding static credentials.
- **Container:** A packaged application and runtime dependencies run in an isolated process environment.
- **Object storage:** Storage for files or blobs addressed by identifiers, commonly used for documents and large assets.
- **Secret:** A credential such as an API key or password that must be stored and accessed through approved controls.

### Professional answer

As a proposed Azure design, I would run the API and workers in managed containers, use a queue for long jobs, object storage for documents, a database for job state, and a managed identity and secret store for credentials. I would keep resource access private where required, scale workers to measured bottlenecks, and instrument the full request path. Equivalent AWS or GCP services can implement the same pattern.

**Remember:** API → queue → workers → state → identity

**Follow-up:** Is this what you deployed previously?

**Reply:** Only if it matches my actual work. Otherwise I would label it as my design and explain the deployment environment I really used.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## CI/CD: release an AI change

**Question:** What belongs in the pipeline for changing a model or prompt?

### Understand it first

CI/CD automates checks and delivery of changes. An AI release can include model, prompt, code, and retrieval changes; all need traceable versions.

**Example:** A prompt edit accidentally increases missing fields. A fixed evaluation set can catch the regression before the change reaches everyone.

1. Run code tests and model evaluations.
2. Record the complete release configuration.
3. Release gradually and retain a tested recovery path.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Rollback:** Returning to an earlier known-good version or undoing a supported transaction.
- **Retrieval:** Searching for and returning relevant source material.
- **Regression:** A previously working behavior becoming worse; a regression test checks against that failure.
- **Baseline:** A reference approach or earlier version used for comparison.
- **CI/CD:** Automated integration checks and delivery or deployment workflows for software changes.
- **Gradual rollout:** Introducing a change to a limited portion of traffic before broader release.
- **Trace:** A record following a request through processing stages to show where work and failures occur.
- **Secret:** A credential such as an API key or password that must be stored and accessed through approved controls.

### Professional answer

I would run unit and contract tests, dependency and secret checks, and a versioned evaluation suite. The release records the application, model, prompt, index, and configuration versions. I would deploy gradually with health and quality checks, compare against the baseline, and retain a tested rollback path. Schema and index changes need compatibility planning.

**Remember:** Tests → eval gate → versions → gradual rollout

**Follow-up:** Does rolling back the model restore everything?

**Reply:** No. Prompt, retrieval, configuration, and data migrations may also have changed. I would treat the release as a versioned bundle and check compatibility before rollback.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Observability: diagnose a regression

**Question:** Answer quality fell and latency doubled. How do you investigate?

### Understand it first

Observability means collecting enough information to understand what the system is doing. Metrics summarize behavior; a trace follows one request through stages.

**Example:** A request takes 12 seconds: 8 waiting, 1 searching, and 3 generating. The trace points to waiting time as the main problem.

1. Split the request into measurable stages.
2. Compare affected groups and versions.
3. Investigate the slow or inaccurate stage and verify the fix.

**Words explained**

- **Schema:** The agreed structure of data, including field names, types, and constraints.
- **Rollback:** Returning to an earlier known-good version or undoing a supported transaction.
- **Latency:** How long one request takes to receive its result.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Tenant:** A customer or organization whose data must be separated from others in a shared service.
- **Redaction:** Removing or masking sensitive information before storing or displaying it.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Retrieval:** Searching for and returning relevant source material.
- **Reranking:** Reordering an already retrieved candidate set using another relevance scorer.
- **Baseline:** A reference approach or earlier version used for comparison.
- **Recall:** Among the relevant items, the fraction the system finds or identifies.
- **Observability:** The ability to understand system behavior through evidence such as metrics, logs, and traces.
- **Trace:** A record following a request through processing stages to show where work and failures occur.
- **Retention:** How long data is kept before deletion or archival under a defined policy.

### Professional answer

I would segment by release, tenant, language, document type, and tool path, then inspect redacted traces. I would separate queue time, retrieval, reranking, model time, and tool latency. I would compare retrieval recall, schema failures, unsupported claims, token use, and retry counts with the baseline. The first mitigation could be rollback, reduced load, or disabling a failing path.

**Remember:** Segment → trace stages → compare → mitigate

**Follow-up:** Can you just log every prompt and response?

**Reply:** That can expose sensitive data. I would use controlled sampling, redaction, access restrictions, and retention rules while preserving identifiers and metrics needed for diagnosis.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Cost: estimate before optimizing

**Question:** Estimate monthly inference cost and choose an optimization.

### Understand it first

Usage cost depends on how many calls are made and how much each call processes. Input and output tokens may have different rates. Other infrastructure adds cost too.

**Example:** Using fictional prices: 100,000 calls × 2,000 input tokens = 200 million input tokens. At $1 per million that is $200. Forty million output tokens at $4 per million add $160. Total: $360 before other costs.

1. Estimate volume and tokens.
2. Apply the relevant rates separately.
3. Measure waste and evaluate savings without losing quality.

**Words explained**

- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Retrieval:** Searching for and returning relevant source material.
- **Inference:** Using a trained model to produce predictions or outputs.

### Professional answer

I would multiply monthly calls by average input and output tokens and the applicable token rates, then add retrieval, hosting, and tool costs. For a hypothetical 100,000 calls with 2,000 input and 400 output tokens, at fictional rates of $1 and $4 per million tokens, inference is $360. I would first measure wasted context and repeated work, then compare routing, caching, or shorter outputs against quality.

**Remember:** Volume × tokens × rates → measure waste

**Follow-up:** Does caching always reduce cost safely?

**Reply:** No. The key needs the relevant user access scope and model, prompt, and content versions. Sensitive or rapidly changing answers may be unsuitable for caching.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Governance: turn policy into controls

**Question:** What would responsible AI governance look like here?

### Understand it first

Governance turns expectations about acceptable AI use into responsibilities, controls, and evidence. It is a practical way to decide who can use what and when humans must review.

**Example:** A tax extractor may need approved data access, a retention limit, a review rule for uncertain amounts, and an owner who responds to incidents.

1. Identify risks and owners.
2. Implement controls in the workflow.
3. Keep evidence that the controls were tested and used.

**Words explained**

- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Provenance:** The recorded origin and processing history of data or results.
- **Retention:** How long data is kept before deletion or archival under a defined policy.

### Professional answer

I would classify use-case risk and data sensitivity, assign owners, define acceptable behavior, and document model and data provenance. Controls include restricted data access, retention, evaluations of harmful or unequal outcomes, human review for consequential actions, and an incident process. Release gates and audit records make the policy enforceable in daily engineering.

**Remember:** Risk → owner → control → evidence

**Follow-up:** Can a responsible-AI document alone prevent harm?

**Reply:** No. I would connect each requirement to an implemented control, a test, an owner, and a response when the control fails.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Evaluation: calibrate the judge

**Question:** How do you make LLM-as-a-judge useful for release decisions?

### Understand it first

An LLM judge is a model used to score another output. It can be useful but can also make mistakes or prefer superficial features such as length. Calibration checks it against trusted human examples.

**Example:** Two answers have the same facts, but one is longer. If the judge always prefers the long answer despite errors, its scoring rule needs correction.

1. Define a clear rubric.
2. Compare judge scores with reviewed examples.
3. Track disagreement and important failure types.

**Words explained**

- **LLM:** Large language model: a model trained to process and generate language, usually token by token.
- **Calibration:** Checking how scores or judgments correspond to reliable observed outcomes or trusted labels.
- **Rubric:** Explicit criteria used to judge an answer or result.
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.

### Professional answer

I would define a specific rubric, calibrate it on human-labeled cases, and measure agreement and failure patterns. I would blind system identities and randomize answer order where relevant. The judge should score dimensions such as correctness and evidence support separately, with deterministic checks for fields and policy rules. I would keep model and judge versions recorded.

**Remember:** Rubric → human calibration → failure slices

**Follow-up:** The judge prefers longer answers. What changes?

**Reply:** I would inspect length bias, refine the rubric, compare paired examples, and validate again against human judgments. A convenient score is not automatically a valid measure of task success.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## A/B testing: measure business value

**Question:** How would you evaluate a new AI assistant online?

### Understand it first

A/B testing compares two versions on randomly assigned groups. A primary metric measures the desired outcome; guardrails check that improvement does not create unacceptable harm elsewhere.

**Example:** Half the eligible users receive version A, half B. Measure resolved cases, but also watch incorrect actions, time, and cost. More clicks alone may mean more confusion.

1. Choose outcome and guardrails before starting.
2. Randomize at an appropriate level.
3. Analyze sufficient data with uncertainty and relevant groups.

**Words explained**

- **Latency:** How long one request takes to receive its result.
- **A/B test:** A controlled comparison of versions using randomly assigned groups when appropriate.
- **Guardrail metric:** A measure that checks whether an improvement causes unacceptable harm in another dimension.

### Professional answer

I would choose a primary outcome such as successfully resolved cases and guardrails such as incorrect actions, complaints, latency, and cost. I would randomize at a unit that reduces contamination, often user or account, estimate sample needs, and predefine the analysis period. I would report uncertainty and segment results; a before-and-after comparison alone can confuse product effects with traffic changes.

**Remember:** Outcome → guardrails → randomize → uncertainty

**Follow-up:** What if clicks rise but resolution falls?

**Reply:** The primary outcome and guardrails decide the result. More clicks can indicate friction rather than value; I would investigate before expanding rollout.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Drift: identify what changed

**Question:** What does drift mean for an LLM application?

### Understand it first

Drift means something about real use changes after development. New document layouts, languages, or policies can make yesterday’s model less effective.

**Example:** Training mainly used clean typed forms. Live traffic now includes many blurry scans. The input changed; the solution might be better document processing rather than retraining alone.

1. Monitor recent inputs and outcomes.
2. Review samples to locate the cause.
3. Update the relevant component and evaluate again.

**Words explained**

- **LLM:** Large language model: a model trained to process and generate language, usually token by token.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Drift:** A change in data, usage, sources, or outcomes after a system was developed.

### Professional answer

I would distinguish changes in user inputs, source knowledge, retrieved results, and output quality. I would monitor representative data slices and regularly label recent cases. A changed embedding distribution is a signal to investigate, not proof of business failure. The response may be reindexing, prompt changes, updated evaluations, or a different model depending on the cause.

**Remember:** Input → knowledge → retrieval → outcome

**Follow-up:** How do you know without ground truth?

**Reply:** Operational proxies can flag issues, but they do not establish correctness. I would maintain a sampled human-review process and delay-dependent outcome labels where available.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Delivery: clarify and estimate

**Question:** A leader asks for an AI assistant in two weeks. What do you do?

### Understand it first

Requirements explain what users need; acceptance criteria define how you know it works. An estimate depends on scope, dependencies, and uncertainty. A technical spike is a short investigation of an unknown.

**Example:** Before promising a two-week extractor, check document access, supported formats, required fields, and review needs. A short experiment can reveal whether scans are readable.

1. Clarify the useful outcome.
2. Test major unknowns.
3. Deliver a small complete slice and refine the plan with feedback.

**Words explained**

- **Interface:** A contract describing what operations a component supports without requiring callers to know its implementation.
- **Trace:** A record following a request through processing stages to show where work and failures occur.
- **Technical spike:** A short investigation or prototype used to reduce uncertainty before committing to an implementation plan.
- **Agile delivery:** Working in small increments with feedback and adjusting priorities as requirements become clearer.
- **Acceptance criteria:** Concrete conditions used to decide whether delivered behavior meets the requirement.

### Professional answer

I would identify users, workflow, data access, success criteria, and the consequences of a wrong answer. I would scope a thin end-to-end slice with explicit acceptance tests, list dependencies and uncertainties, and estimate a range after a short technical spike. In Agile delivery I would demonstrate working increments, collect feedback, and update risks and priorities with the product owner.

**Remember:** Requirements → acceptance → spike → increments

**Follow-up:** What would you put in the project specification?

**Reply:** Scope, inputs and outputs, domain rules, interfaces, security and reliability targets, evaluation criteria, dependencies, milestones, and assumptions. A traceable backlog and simple project spreadsheet can make ownership and progress clear.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Airline design: disrupted travel assistant

**Question:** Design an assistant that helps a passenger after a cancelled flight.

### Understand it first

An airline assistant needs current operational facts and written policies. Policies can be retrieved from documents, but available seats and booking status require live services.

**Example:** A policy permits rebooking, but the proposed seat sells out before approval. The system must fetch a new option and obtain approval for that changed offer.

1. Verify the passenger and reservation.
2. Combine live options with applicable policy.
3. Approve an exact offer, recheck it, commit safely, and confirm the result.

**Words explained**

- **Idempotency:** Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees.
- **Authentication:** Checking who the caller is.
- **Retrieval:** Searching for and returning relevant source material.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would clarify whether the assistant only explains options or can rebook. Policy answers use versioned retrieval; flight status and available seats come from live tools. A bounded workflow authenticates the passenger, reads the reservation, retrieves eligible options, obtains approval for the exact itinerary and price, and commits through the reservation service with idempotency. I would recheck availability before commit, notify only after confirmation, and provide an agent handoff when state is uncertain.

**Remember:** Clarify → live tools + policy RAG → approval → safe commit

**Follow-up:** Inventory changes after the user approves. What happens?

**Reply:** I would stop that attempt, fetch current options, and request approval for the new offer. I would not silently substitute another flight or price.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Transformers: explain without hand-waving

**Question:** Explain a decoder transformer and the difference between training and inference.

### Understand it first

A transformer is a neural-network architecture that processes token representations using attention and other layers. A decoder model predicts the next token using earlier context. Training changes its learned numbers; inference uses them.

**Example:** Given “The total is”, the model predicts a next token based on learned patterns and supplied context. Its ability to produce plausible text does not guarantee it copied the correct amount.

1. Convert text to tokens and numerical representations.
2. Combine context through attention and other layers.
3. Predict successive tokens and validate task outputs.

**Words explained**

- **Token:** A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential.
- **Embedding:** A list of numbers representing content so a system can compare items, often for similarity in meaning.
- **Fine-tuning:** Additional training that changes some or all learned model parameters for a task or domain.
- **Model parameters / weights:** Learned numbers that determine how a model transforms its inputs.
- **Loss:** A numerical training-error measure minimized during learning; it may differ from the business success metric.
- **Attention:** A computation that combines information from token representations using learned relevance weights.
- **Causal attention:** Attention restricted so a position cannot use later tokens when predicting the next token.
- **Residual connection:** A shortcut that adds an earlier representation to a later layer's output.
- **Normalization:** Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules.
- **Inference:** Using a trained model to produce predictions or outputs.

### Professional answer

Tokens become embeddings with position information. Causal self-attention combines information from earlier tokens, and feed-forward layers transform those representations using residual connections and normalization. Training adjusts weights using a loss such as next-token prediction; inference applies learned weights to generate tokens. Context is temporary input, while fine-tuning changes parameters.

**Remember:** Tokens → attention → layers → next-token distribution

**Follow-up:** Does attention mean the model understands or remembers everything?

**Reply:** No. Attention is a computation over representations. Limited context, learned associations, and generation errors mean I still need external evidence and task-specific evaluation.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.


## Python: sliding-window rate limiter

**Question:** Implement allow(user) for at most N requests per rolling W seconds. Explain boundaries, concurrency, and scaling.

### Understand it first

A rate limiter restricts how many requests a user can make during a time window. A deque is a queue that efficiently removes old entries from the front.

**Example:** Limit: two requests per ten seconds. Requests at 0 and 1 are accepted; at 2 the next is refused. At 10, the request at 0 expires under this solution’s boundary rule, so another can enter.

1. Remove timestamps outside the window.
2. Check the number remaining while holding a lock.
3. If there is room, record and accept the new request.

**Words explained**

- **Monotonic:** Moving in only one direction; a monotonic clock avoids jumps caused by wall-clock corrections.
- **Atomic:** Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step.
- **Concurrency:** Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution.
- **Thread:** An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope.
- **REST API:** An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts.
- **Queue:** A waiting list of work to be processed, often used to absorb bursts.
- **Window:** A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies.
- **Deque:** A double-ended queue with efficient additions and removals at either end.
- **Amortized cost:** Average work per operation across a sequence, allowing some individual operations to do more work.
- **O(1):** Work bounded independently of input size under the stated assumptions; not a promise of a fixed number of milliseconds.

### Professional answer

I would keep a deque of accepted timestamps per user, remove expired entries, and accept only below the limit. A monotonic clock avoids wall-clock jumps, and a lock protects the check-and-append operation within one process. Each timestamp is appended and removed once, giving amortized O(1) work per request. Production needs idle-key cleanup and a shared atomic implementation across replicas.

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

### Understand it first

Reciprocal rank fusion combines search result orderings without comparing their raw score scales. Higher-ranked documents receive larger votes. Repeated appearances across lists add votes.

**Example:** With k=60, rank 1 contributes 1/61 and rank 2 contributes 1/62. A document highly ranked by both searches can outrank one found by only a single search.

1. Give each document a vote based on rank.
2. Ignore repeats within the same result list.
3. Add votes across lists and sort by total, using a stable tie-break.

**Words explained**

- **Authorization:** Checking whether that caller is allowed to perform the particular operation on the particular data.
- **Vector:** An ordered list of numbers; embeddings are vectors used to represent content.
- **Retrieval:** Searching for and returning relevant source material.
- **Lexical search:** Search based on words or exact text matches.
- **Reciprocal rank fusion:** Combining result rankings by adding a rank-based vote, commonly 1/(k+rank), for each document.
- **Rank:** In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list.
- **Big-O notation:** Describes how work or memory grows with input size: linear O(n), sorting often O(n log n), constant O(1).
- **Deterministic:** Producing the same result for the same relevant inputs and conditions.

### Professional answer

I would accumulate 1 divided by k plus rank for each document across lists. A per-list set prevents a repeated document from gaining extra votes in that list. I would sort by descending fused score and then document ID for deterministic ties. With M total entries and U unique documents, work is O(M + U log U), and space is O(U). All candidate lists must already respect authorization.

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

### Understand it first

An evaluator compares predictions with correct answers. Field accuracy counts individual correct fields; document exact match requires the whole expected record to match under the chosen rules.

**Example:** Expected vendor=A and amount=100; predicted vendor=A and amount=90. Field accuracy is 1/2=50%, but document exact match is 0. Missing a field differs from explicitly returning null.

1. Define comparison and missing-value rules.
2. Count correct fields and complete records.
3. Handle empty inputs and unexpected output explicitly.

**Words explained**

- **Normalization:** Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules.
- **Sentinel:** A unique marker representing a special condition such as a missing key, distinct from a real value like None.

### Professional answer

I would define comparison rules before coding. This implementation checks exact string-or-null equality across required fields and penalizes extra fields in whole-document exact match. A sentinel separates a missing prediction from an explicit null. It reports unexpected documents separately and returns undefined rates as None for empty denominators. Runtime is linear in the fields and document IDs inspected.

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

### Understand it first

A project story links the business problem, your contribution, a design decision, and evidence of results. It should be understandable before you discuss individual tools.

**Example:** For Orchestra: explain tax documents → required fields → extraction and checks → downstream use. Then add one real decision and its verified outcome.

1. Explain who needed what.
2. Describe your actual implementation and decision.
3. Use measured evidence where available and state limitations.

**Words explained**

- **Baseline:** A reference approach or earlier version used for comparison.
- **Orchestra:** The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed.
- **State:** The information representing a workflow or object's current condition and progress.

### Professional answer

I would structure my real example as: business problem and users; my exact ownership; data and model flow; one difficult engineering decision; evaluation and deployment; one limitation and next improvement. For the tax-extraction work using Orchestra, the bank’s internal tool, I can discuss digital PDFs and spreadsheets and extracting workflow IDs, dates, vendor, and amount. I must fill in only training settings, deployment facts, and outcomes I can substantiate.

**Remember:** Problem → ownership → architecture → evidence → limitation

**Follow-up:** What was the baseline behind the claimed savings?

**Reply:** I would name the baseline workflow, sample, measurement period, and calculation. If the percentage was an estimate rather than a controlled result, I would say so and explain what evidence I do have.

**Context:** Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.

