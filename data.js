const cards=[
  {
    "project": "bofa",
    "title": "Explain your Bank of America work",
    "q": "Walk me through the tax-document extraction system you built.",
    "label": "Updated experience · Orchestra",
    "answer": "At Bank of America, I work on a tax-document field-extraction workflow using Orchestra, the bank’s internal tool. The workflow processes tax-related documents and extracts required fields such as workflow IDs, dates, vendor names, and amounts into a structured result for validation and downstream use. My work spans data preparation, extraction, validation, APIs, and the review UI. Orchestra is the internal platform; I would verify its underlying model and supported adaptation methods before naming a specific training technique.",
    "hint": "Lead with the business problem, then inputs → model → validation → delivery, and end with your ownership.",
    "trap": "Why use OCR if the inputs were digital PDFs?",
    "rubric": [
      "Names the input and four fields",
      "Explains end-to-end ownership",
      "Separates remembered facts from unknown details"
    ],
    "cue": "Tax documents → Orchestra → structured fields → validation",
    "reply": "Digital PDFs may contain embedded images or unreliable text. I would extract native text first and use OCR only where needed.",
    "evidence": "User correction: the bank workflow uses the internal tool Orchestra, not Qwen3. Previously supplied inputs, field examples, and ownership inform this summary. The underlying model, training interface, and historical fine-tuning method have not been confirmed.",
    "seconds": 45,
    "id": "legacy-0",
    "round": 1,
    "learn": {
      "plain": "Field extraction means finding named pieces of information in a document and putting them into predictable slots. Orchestra is the internal bank tool used in your workflow; the tool name alone does not tell us which model runs underneath.",
      "example": "A tax document says “Vendor: Example Co” and “Amount: $125.” The desired result is vendor=Example Co and amount=125, with checks that both came from the right document.",
      "steps": [
        "Read or parse the document.",
        "Use Orchestra to obtain the required fields.",
        "Check values against the source and send uncertain cases for review."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Qwen",
          "meaning": "A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "OCR",
          "meaning": "Optical character recognition: converting text visible in images or scans into machine-readable text."
        },
        {
          "term": "Interface",
          "meaning": "A contract describing what operations a component supports without requiring callers to know its implementation."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "Why an LLM at all?",
    "q": "Why use AI through Orchestra instead of only rules or a spreadsheet parser?",
    "label": "Recommended approach",
    "answer": "I would parse reliable spreadsheet columns and native PDF text directly first. AI-assisted extraction through Orchestra can help map varied tax-document layouts and labels to a consistent set of required fields. I would compare it with a rules-based baseline on representative held-out documents, measuring field accuracy, reviewer effort, latency, and cost. Whether Orchestra exposes an LLM or another extraction model must be verified.",
    "hint": "Separate document parsing from semantic field mapping.",
    "trap": "If the spreadsheet already has a vendor column, why send it to an LLM?",
    "rubric": [
      "Starts with direct parsing",
      "Explains when a model adds value",
      "Defines a measurable baseline"
    ],
    "cue": "Parse first → model ambiguity → measure value",
    "reply": "If a vendor column is reliable, I would read it directly. Sending it through a model adds cost and another opportunity for error.",
    "evidence": "Recommended explanation for the user-confirmed Orchestra workflow. Orchestra is a tool/platform name, not evidence of a particular model family.",
    "seconds": 45,
    "id": "legacy-1",
    "round": 1,
    "learn": {
      "plain": "Use an ordinary parser when information is already in a predictable location. A language model can help when the same meaning appears under different labels or layouts. Extra complexity needs a measurable benefit.",
      "example": "One spreadsheet always has a Vendor column, so read that column directly. A set of PDFs uses “Supplier,” “Payee,” and “Vendor”; a model may help map these labels to one field.",
      "steps": [
        "Try direct extraction first.",
        "Identify errors caused by varied language or layouts.",
        "Compare the AI result with the simple approach on the same documents."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "LLM",
          "meaning": "Large language model: a model trained to process and generate language, usually token by token."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "Which fine-tuning fits tax-field extraction?",
    "q": "For tax-document field extraction through Orchestra, which fine-tuning approach would you choose?",
    "label": "Recommended approach",
    "answer": "I would start with supervised fine-tuning, or SFT, if Orchestra supports model adaptation and a prompted baseline still makes recurring extraction errors. The training examples pair a tax document or its extracted content with a human-verified structured answer containing the required fields. SFT teaches the input-to-output task. If the underlying model supports adapters, LoRA is a practical way to perform SFT with fewer trainable parameters; QLoRA is an option when supported quantization is needed to reduce base-weight memory. The platform’s actual capabilities determine which method is available.",
    "hint": "Explain the choice, its constraints, and how you would validate it.",
    "trap": "Can you fine-tune Orchestra itself with LoRA?",
    "rubric": [
      "Distinguishes SFT from LoRA and QLoRA",
      "Checks platform support before choosing a method",
      "Uses labeled extraction examples and evaluates against a baseline"
    ],
    "cue": "SFT = learning task → LoRA = update method → Orchestra support",
    "reply": "Orchestra is the internal tool. LoRA would adapt a compatible underlying model, if the platform exposes that capability. If it only offers an inference API, I would use its supported managed tuning option or improve prompts, document parsing, and validation.",
    "evidence": "Recommended future approach, not a claim about a completed training run. User confirmed Orchestra and tax-field extraction; base model, access to weights, tuning support, and prior recipe are unknown.",
    "seconds": 45,
    "id": "legacy-2",
    "round": 1,
    "source": {
      "title": "Supervised fine-tuning reference",
      "url": "https://huggingface.co/docs/trl/sft_trainer"
    },
    "learn": {
      "plain": "Supervised fine-tuning means teaching a model using examples with correct answers. For extraction, each example pairs document content with the correct fields. LoRA describes which parameters are trained; it can be used while doing supervised fine-tuning.",
      "example": "Training input: “Vendor: Example Co; Amount: 125 USD.” Correct output: vendor=Example Co, amount=125, currency=USD. Hundreds of varied examples teach a pattern rather than one document.",
      "steps": [
        "Check whether Orchestra supports training a model.",
        "First measure its existing extraction behavior.",
        "If training is available and justified, use reviewed examples and test on unseen documents."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "SFT",
          "meaning": "Supervised fine-tuning: training on inputs paired with correct example outputs."
        },
        {
          "term": "LoRA",
          "meaning": "A method that trains small adapter matrices while keeping the base model weights fixed."
        },
        {
          "term": "QLoRA",
          "meaning": "Adapter training using a quantized frozen base model to reduce the memory used by its weights."
        },
        {
          "term": "Quantization",
          "meaning": "Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Adapter",
          "meaning": "A small trainable addition used to adapt a model without updating all its base weights."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "Valid JSON. Wrong money.",
    "q": "The output is valid JSON, but the amount belongs to the wrong vendor. What now?",
    "label": "Recommended approach",
    "answer": "Valid JSON only proves structure. I would trace each amount back to its source, check its vendor and currency, and distinguish totals from subtotals and tax. Conflicting evidence goes to review. Then I would locate the error in parsing, extraction, or mapping and add that case to the regression set.",
    "hint": "Think about relationships, source evidence, and exception routing.",
    "trap": "The model says it is 99% confident. Can it auto-approve?",
    "rubric": [
      "Separates schema from correctness",
      "Uses source evidence and field relationships",
      "Does not trust uncalibrated self-confidence"
    ],
    "cue": "Structure ≠ correctness → evidence → regression",
    "reply": "No. A model’s self-reported confidence is not a calibrated probability. Any automatic approval threshold needs validation against labeled outcomes.",
    "evidence": "Recommended design. This is a hypothetical failure scenario, not an incident you said occurred.",
    "seconds": 45,
    "id": "legacy-3",
    "round": 1,
    "learn": {
      "plain": "A result can have the right format and the wrong meaning. Validation must check both. Think of a correctly filled form with somebody else’s amount written in it.",
      "example": "The document lists Vendor A: $100 and Vendor B: $900. Outputting {vendor: A, amount: 900} may be valid structured data, but it associates the wrong facts.",
      "steps": [
        "Check the output format.",
        "Trace each value to the source and its related fields.",
        "Send conflicts for review and keep the example as a future test."
      ],
      "terms": [
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Calibration",
          "meaning": "Checking how scores or judgments correspond to reliable observed outcomes or trusted labels."
        },
        {
          "term": "JSON",
          "meaning": "A structured text format using named fields, objects, and lists."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "The metric cross-examination",
    "q": "How would you defend the estimated 50–60% manual-effort reduction?",
    "label": "Recommended approach",
    "answer": "The 50–60% figure on my résumé is an estimate, not a controlled benchmark. To substantiate it, I would compare total human handling time before and after, including review, corrections, and exceptions, across comparable documents. Faster extraction only matters if the complete workflow takes less effort without sacrificing quality.",
    "hint": "Include human review and errors in the denominator.",
    "trap": "Did time saved in extraction just move to reviewers?",
    "rubric": [
      "Labels the historical number as estimated",
      "Includes total human handling time",
      "Controls document mix and checks quality"
    ],
    "cue": "Estimate → total handling time → quality",
    "reply": "Then the measurement is incomplete. I would include reviewer time and compare the full workflow, not just extraction.",
    "evidence": "Do not invent sample size, baseline minutes, or a measured causal result. Verify the original basis before quoting the number as proven.",
    "seconds": 45,
    "id": "legacy-4",
    "round": 1,
    "learn": {
      "plain": "A savings percentage needs a clear before-and-after calculation. Include all human work, including checking and correcting the model’s output.",
      "example": "Illustration only: the old process takes 10 minutes; extraction plus review now takes 4. The reduction is (10−4)/10=60%. These are teaching numbers, not your measured results.",
      "steps": [
        "Define what time is being measured.",
        "Compare similar document types.",
        "Include corrections and review before calculating savings."
      ],
      "terms": [
        {
          "term": "Causal attention",
          "meaning": "Attention restricted so a position cannot use later tokens when predicting the next token."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "The duplicate-delivery incident",
    "q": "The API accepted your result, but your job timed out. Is retrying safe?",
    "label": "Recommended approach",
    "answer": "A timeout does not mean the write failed. I would give each delivery a stable idempotency key, enforce it atomically at the destination, and persist delivery status. On an ambiguous timeout, I would reconcile before retrying. That prevents a successful delivery from becoming a duplicate.",
    "hint": "A timeout does not prove the write failed.",
    "trap": "Two workers both check for the same key. What stops the race?",
    "rubric": [
      "Defines a stable operation identity",
      "Requires atomic destination enforcement",
      "Handles ambiguous completion"
    ],
    "cue": "Timeout ≠ failure → stable key → atomic write",
    "reply": "A database uniqueness constraint or atomic conditional write. A separate existence check followed by an insert is vulnerable to races.",
    "evidence": "Recommended approach; not a claim that a specific destination or API supported this in your implementation.",
    "seconds": 45,
    "id": "legacy-5",
    "round": 1,
    "learn": {
      "plain": "A timeout means you stopped waiting for an answer. The other system may already have finished. An idempotency key is a stable operation ID that lets the receiver recognize a repeated request.",
      "example": "You submit extraction result job-42. It is saved, but the reply is lost. Sending job-42 again should return the saved outcome rather than create another result.",
      "steps": [
        "Assign one stable ID to the intended operation.",
        "Have the destination enforce uniqueness as one indivisible step.",
        "Check existing status before retrying an uncertain operation."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Atomic",
          "meaning": "Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "MCP is not a quality metric",
    "q": "You used MCP retrieval. How does that make answers accurate?",
    "label": "Recommended approach",
    "answer": "MCP provides a way to expose retrieval; it does not guarantee answer quality. I would check that retrieval returns authorized, current evidence and that the answer actually follows it. If evidence is missing or conflicting, the system should clarify or abstain. I would evaluate retrieval and generation separately.",
    "hint": "Separate access, retrieval relevance, and answer grounding.",
    "trap": "Can a grounded answer still be wrong?",
    "rubric": [
      "Distinguishes transport from quality",
      "Checks freshness and permissions",
      "Explains grounded but outdated evidence"
    ],
    "cue": "Access → evidence → supported answer",
    "reply": "Yes. An answer can faithfully repeat an outdated source. Grounding establishes support, not necessarily truth.",
    "evidence": "Your résumé establishes MCP-based retrieval. Exact indexing, access controls and evaluation implementation are not yet supplied.",
    "seconds": 45,
    "id": "legacy-6",
    "round": 1,
    "learn": {
      "plain": "MCP is a standard way for an AI application to connect to tools and information. It provides access; accuracy also depends on finding the right information and using it correctly.",
      "example": "A tool successfully retrieves last year’s tax policy. The connection worked, but the answer may still be wrong for this year.",
      "steps": [
        "Check access permissions.",
        "Check that retrieved information is relevant and current.",
        "Check that the answer is supported by that information."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Abstention",
          "meaning": "Declining to make a prediction or take an action when the available evidence is insufficient."
        },
        {
          "term": "Grounding / faithfulness",
          "meaning": "Whether an answer is supported by supplied evidence; the evidence itself can still be outdated or wrong."
        },
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        }
      ]
    }
  },
  {
    "project": "bofa",
    "title": "The architecture whiteboard",
    "q": "Design the tax-document pipeline for bursts, review, and safe reprocessing.",
    "label": "Recommended approach",
    "answer": "I would separate ingestion, parsing, Orchestra-based extraction, validation, review, and delivery. A durable queue absorbs bursts; versioned inputs, prompts, and outputs support replay; idempotent delivery prevents duplicates. I would monitor field errors, review rate, queue age, latency, and cost. Before sizing workers or discussing training infrastructure, I would establish document volumes, service limits, and what Orchestra actually provides.",
    "hint": "Include recovery and human review, not just components.",
    "trap": "How do you reprocess a document without overwriting an approved correction?",
    "rubric": [
      "Asks for scale and latency",
      "Includes versioning and human corrections",
      "Explains capacity and failure recovery"
    ],
    "cue": "Queue → validate → version → replay",
    "reply": "I would preserve the approved correction as a separate authoritative version, then stage reprocessed output for comparison rather than silently overwriting it.",
    "evidence": "Recommended architecture. Do not describe queue technology, deployment topology or throughput as historical facts.",
    "seconds": 45,
    "id": "legacy-7",
    "round": 1,
    "learn": {
      "plain": "A document pipeline is a series of stations: receive, read, extract, check, review, and deliver. Separating stations makes failures easier to locate and recover from.",
      "example": "If 500 documents arrive together, a queue holds waiting jobs. Several workers process them, while each document keeps its own status. These numbers are illustrative.",
      "steps": [
        "Save the input before processing.",
        "Track progress and errors at each station.",
        "Keep old results and approved corrections when processing again."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Throughput",
          "meaning": "How much work the system completes per unit of time."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "The synthetic benchmark trap",
    "q": "What does 96.3% action-field exact match on 1,080 synthetic cases actually prove?",
    "label": "Report-backed · synthetic result",
    "answer": "The 96.3% result is 1,040 of 1,080 synthetic action cases matching seven selected fields, with the operational checks also passing. It is not full-response or real-user accuracy. The report also found normalized template overlap with training, so I treat it as a regression benchmark. My next step would be an independently written holdout and a matched base-model comparison.",
    "hint": "Do not turn a synthetic test score into a real-user success claim.",
    "trap": "Would you accept that error rate for destructive actions?",
    "rubric": [
      "Defines metric scope",
      "Challenges leakage and representativeness",
      "Considers failure severity"
    ],
    "cue": "1,040/1,080 → selected fields → template limitation",
    "reply": "No. For destructive actions, accuracy alone is insufficient; execution also needs authorization, state checks, and a safe failure path.",
    "evidence": "Supplied NoteEchoes report: saved outputs were rescored, inference was not rerun. Selected fields: intent, mode, items, entities, draft, requires_confirmation, proposed_tool. No established improvement over stock Qwen.",
    "seconds": 45,
    "id": "legacy-8",
    "round": 1,
    "learn": {
      "plain": "A benchmark is a set of test examples. Synthetic examples were created for testing rather than collected directly from normal users. A high score on familiar-looking examples may not predict performance on new requests.",
      "example": "If training says “move note X to folder Y” and testing only changes X and Y, the model may recognize a template rather than handle genuinely new phrasing.",
      "steps": [
        "State exactly which fields were scored.",
        "Check overlap between training and test examples.",
        "Test independently written examples before making broader claims."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "Synthetic data",
          "meaning": "Examples created artificially rather than directly observed from normal use."
        },
        {
          "term": "Qwen",
          "meaning": "A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "rag",
    "title": "The retrieval autopsy",
    "q": "Your codebase assistant cites code but gives the wrong answer. How do you debug it?",
    "label": "Recommended RAG design",
    "answer": "I would debug retrieval before changing the prompt. First, check whether the correct repository version and relevant code reached the model. Then inspect chunk boundaries, ranking, missing dependencies, and whether the answer follows the evidence. I would evaluate retrieval and generation separately and turn the failure into a regression case.",
    "hint": "Find the first stage where the right evidence is lost.",
    "trap": "What stops self-correcting search from looping forever?",
    "rubric": [
      "Separates retrieval and generation",
      "Checks stale indexes and code context",
      "Requires bounded retries and evaluation"
    ],
    "cue": "Find evidence → inspect ranking → verify answer",
    "reply": "A fixed search-step budget, a time budget, and a stop condition when evidence no longer improves. Without enough evidence, return a qualified answer or ask for clarification.",
    "evidence": "Proposed RAG design. Your résumé establishes LangGraph, Claude, Pinecone, asynchronous retrieval and Ragas; exact graph, metrics and operational behavior remain unverified.",
    "seconds": 45,
    "id": "legacy-9",
    "round": 1,
    "learn": {
      "plain": "Retrieval is the step that searches for useful source material before an answer is generated. If the search misses the right material, changing the writing instructions may not fix the answer.",
      "example": "A question asks where login tokens expire. Search returns the login page but misses the token-expiry function. The model lacks the decisive evidence.",
      "steps": [
        "Confirm the right source version is indexed.",
        "Inspect what search actually returned.",
        "Only then examine how the model used that evidence."
      ],
      "terms": [
        {
          "term": "Async",
          "meaning": "A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "RAG",
          "meaning": "Retrieval-augmented generation: find relevant external content and supply it to a model to help answer."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Chunk",
          "meaning": "A bounded piece of a document or codebase used for indexing and retrieval."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "LangGraph",
          "meaning": "A framework for representing agent workflows as stateful steps and transitions, with persistence options."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Crash between two worlds",
    "q": "A file moved, but the database journal still says pending. Recover safely.",
    "label": "Report-backed implementation",
    "answer": "The file system and SQLite are not one atomic transaction. In MFlash’s safer move path, a prepared journal record comes first, then the file operation and verification, then commitment. Recovery checks actual file contents before restoring or finalizing. If the original path is occupied, undo uses a collision-safe alternative instead of overwriting newer data.",
    "hint": "Model the crash window explicitly.",
    "trap": "Why is SQLite WAL not sufficient by itself?",
    "rubric": [
      "Recognizes cross-system atomicity gap",
      "Reconciles instead of blind retry",
      "Protects newer state during undo"
    ],
    "cue": "Prepared record → verify bytes → safe undo",
    "reply": "WAL protects database consistency. It does not make an external file operation part of the same transaction, so crash windows still need reconciliation.",
    "evidence": "Based on supplied MFlash code-review report. The safer move path uses a destination hard link, verification, source unlink and database update. This is recoverable evidence, not a global exactly-once guarantee.",
    "seconds": 45,
    "id": "legacy-10",
    "round": 1,
    "learn": {
      "plain": "Moving a file and updating a database are separate operations. A crash can happen between them. A journal is a saved record of the intended action that helps recovery determine what happened.",
      "example": "A file moves from A to B, then the app crashes before recording success. On restart, recovery checks A and B instead of assuming the move never happened.",
      "steps": [
        "Save the planned action.",
        "Perform the move and verify the result.",
        "On restart, compare the journal with actual files before completing or undoing."
      ],
      "terms": [
        {
          "term": "Atomic",
          "meaning": "Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Transaction",
          "meaning": "A group of database changes committed together under defined consistency guarantees."
        },
        {
          "term": "Journal",
          "meaning": "A saved record of intended or completed actions used for auditing or recovery."
        },
        {
          "term": "Collision",
          "meaning": "Here, a destination name or path is already occupied by another file."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "SQL",
          "meaning": "A language for querying and transforming relational data."
        },
        {
          "term": "Window",
          "meaning": "A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies."
        }
      ]
    }
  },
  {
    "project": "data",
    "title": "The skewed Spark job",
    "q": "A 5 TB/day pipeline slows down. One key owns 40% of the records. What do you do?",
    "label": "Recommended approach",
    "answer": "I would first check whether a few keys account for most of the data and compare task sizes and durations. If one key overloads a task, I would reduce or redistribute that work. For a sum, I can calculate partial totals before combining them, which is pre-aggregation. If needed, I can process the frequent key separately or temporarily split it into buckets using salting. The method depends on whether the operation is a join or an aggregation, and I would verify that the result is unchanged before comparing runtime and cost.",
    "hint": "Do not prescribe resources before locating the bottleneck.",
    "trap": "Why not just add more workers?",
    "rubric": [
      "Diagnoses from metrics",
      "Explains hot-key behavior",
      "Checks correctness and cost"
    ],
    "cue": "Measure → locate skew → validate fix",
    "reply": "Adding workers does not automatically divide records that must stay together under the same key. I would first change how that key’s work is reduced or distributed. For joins, I would inspect whether Spark’s adaptive skew handling applies before adding custom logic.",
    "evidence": "Recommended diagnosis for a hypothetical incident; do not imply this was a specific Sedin production failure.",
    "seconds": 45,
    "id": "legacy-11",
    "round": 1,
    "learn": {
      "plain": "Spark divides a large dataset into smaller pieces called partitions so many tasks can work in parallel. A key is the value used to group or match rows, such as customer_id. If one key occurs far more often than others, one task can receive much more work. This imbalance is called data skew; the frequent key is called a hot key.",
      "example": "Imagine 100 sales rows: 60 belong to Store A, while the other 40 belong to different stores. Grouping by store may send all 60 A rows to one task. More workers do not automatically split that group. For a sum, split A rows into A-0, A-1, and A-2; total each subgroup, then add those totals back into A.",
      "steps": [
        "Find the slow task and compare its row count with others.",
        "Pre-aggregate means calculate partial results before expensive data movement: local sums can become a final sum. For an average, combine sums and counts, not averages alone.",
        "A separate hot-key path means process Store A rows in a special branch, process other stores normally, then combine the results. It is a processing strategy, not a file path.",
        "Salting means temporarily add a bucket value to the hot key so its rows can be distributed. For a join, the matching rows on the other side must cover the same buckets; careless salting can lose matches or create duplicates.",
        "Check totals and row counts, then compare time and cost. Choose the remedy that fits the actual operation."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Hot key",
          "meaning": "A grouping or matching value that appears unusually often and can concentrate work on one task."
        },
        {
          "term": "Data skew",
          "meaning": "Uneven data distribution that gives some tasks much more work than others."
        },
        {
          "term": "Salting",
          "meaning": "Temporarily adding bucket labels to a frequent key to distribute work, then carefully preserving the original result."
        },
        {
          "term": "Pre-aggregation",
          "meaning": "Calculating partial results early to reduce data sent to a later aggregation stage. Partial sums can be added; averages require sums and counts."
        },
        {
          "term": "Separate hot-key path",
          "meaning": "A separate processing branch for frequent keys, with other keys handled normally. It is not a filesystem path."
        },
        {
          "term": "Join",
          "meaning": "Combining rows from datasets using a matching condition, such as the same customer ID."
        },
        {
          "term": "Aggregation",
          "meaning": "Combining multiple records into a summary such as sum, count, or average."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "Explain NoteEchoes",
    "q": "Tell me about NoteEchoes in under a minute.",
    "answer": "I built NoteEchoes to turn spoken thoughts and imported documents into organized, searchable notes. It combines Flutter and Swift with a specialized Qwen3-0.6B model running locally through MLX. The key design is saving the note before AI enhancement, then validating the result and rejecting it if the user has edited the note. That keeps capture useful even when generation fails.",
    "cue": "Capture → local Qwen → save before AI",
    "trap": "Is every part of the app offline?",
    "reply": "No. Core inference and storage are local, but model downloads, optional web lookup and feedback, and some speech fallback paths can use the network.",
    "evidence": "Project implementation is supported by the supplied report; personal ownership comes from your résumé. Current TestFlight status, user adoption and device performance were not verified.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Capture → local Qwen → save before AI",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-12",
    "round": 1,
    "learn": {
      "plain": "NoteEchoes turns captured thoughts into notes, then adds AI assistance. Local inference means the model runs on the device. Saving first protects the original note even if AI processing fails.",
      "example": "You dictate a grocery list. The app saves the text immediately, then attempts to organize it. If the model fails, the original list is still available.",
      "steps": [
        "Capture and save the note.",
        "Run enhancement on the saved content.",
        "Validate the result before applying it."
      ],
      "terms": [
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        },
        {
          "term": "MLX",
          "meaning": "A machine-learning framework for Apple silicon, used here for local model execution."
        },
        {
          "term": "Qwen",
          "meaning": "A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "Why such a small model?",
    "q": "Why Qwen3-0.6B for NoteEchoes?",
    "answer": "The task is constrained intent and action interpretation, which makes a small specialized model a reasonable fit for an iPhone. The implementation uses Qwen3-0.6B with structured validation, while document answers use cited excerpts. I would justify the final model choice with device latency, memory, and task-quality measurements rather than parameter count alone.",
    "cue": "Constrained task → device fit → measure",
    "trap": "How much faster is it than a larger model?",
    "reply": "I do not have a verified comparative device benchmark. I would measure cold start, warm latency, memory and battery under the same workload.",
    "evidence": "The report confirms Qwen3-0.6B and local MLX configuration. Device benchmark results and the original model-selection rationale are unknown. Rationale here is a design explanation, not measured evidence.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Constrained task → device fit → measure",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-13",
    "round": 1,
    "learn": {
      "plain": "A small model has fewer learned parameters and can require less memory than a larger one. It may be suitable for a narrow task, but model size alone does not prove speed or accuracy.",
      "example": "Recognizing “create a note” versus “search my notes” is narrower than answering arbitrary science questions. A small specialized model may handle the first task well.",
      "steps": [
        "Define the actual task.",
        "Measure quality and device resource use.",
        "Choose the smallest model that meets the requirements."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "MLX",
          "meaning": "A machine-learning framework for Apple silicon, used here for local model execution."
        },
        {
          "term": "Qwen",
          "meaning": "A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "Explain your fine-tuning",
    "q": "How is the NoteEchoes model adapted?",
    "answer": "The training pipeline adapts pretrained Qwen3-0.6B with QLoRA and rsLoRA. It keeps the base in four-bit NF4 and trains adapters on the expected completions, with prompt tokens masked from the loss. Deployment is a separate eight-bit MLX artifact. The distinction is important: training quantization and inference quantization are different stages.",
    "cue": "Pretrained base → completion loss → separate deployment",
    "trap": "What are the adapter settings?",
    "reply": "The inspected initial configuration uses rank 32, alpha 64, and dropout 0.05, targeting attention and MLP projections. I would check the run artifacts before saying those settings produced the deployed checkpoint.",
    "evidence": "Supplied report confirms configuration, not a complete training-to-shipped-weights chain. Initial learning rate 4e-5; one epoch; sequence length 1,024. No established contribution from the experimental GRPO code.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Pretrained base → completion loss → separate deployment",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-14",
    "round": 1,
    "learn": {
      "plain": "The NoteEchoes training setup keeps most model parameters fixed and trains small additions called adapters. Quantization stores numbers with fewer bits. The training representation and the deployed phone representation can use different formats.",
      "example": "Think of a large reference book kept unchanged, with a small set of learned annotations. The analogy explains the small update; adapters are numerical matrices rather than written notes.",
      "steps": [
        "Start from the pretrained model.",
        "Train adapters on expected responses; exclude input tokens from the training loss where configured.",
        "Convert and evaluate the separate deployment artifact."
      ],
      "terms": [
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "QLoRA",
          "meaning": "Adapter training using a quantized frozen base model to reduce the memory used by its weights."
        },
        {
          "term": "rsLoRA",
          "meaning": "A LoRA variation that changes how adapter updates are scaled as rank changes."
        },
        {
          "term": "NF4",
          "meaning": "A four-bit number representation used for quantizing approximately normally distributed weights in some training setups."
        },
        {
          "term": "Quantization",
          "meaning": "Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Adapter",
          "meaning": "A small trainable addition used to adapt a model without updating all its base weights."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "LoRA alpha",
          "meaning": "A setting that controls adapter-update scaling together with the implementation's rank-dependent rule."
        },
        {
          "term": "Dropout",
          "meaning": "A training technique that randomly disables some activations to reduce dependence on particular paths."
        },
        {
          "term": "Learning rate",
          "meaning": "The step-size setting controlling how strongly training updates parameters."
        },
        {
          "term": "Epoch",
          "meaning": "One pass through the training dataset."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Masked from loss",
          "meaning": "Excluded from contributing directly to the selected training loss, such as input prompt tokens in completion-only training."
        },
        {
          "term": "Completion",
          "meaning": "The response text generated by the model after the input."
        },
        {
          "term": "Attention",
          "meaning": "A computation that combines information from token representations using learned relevance weights."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        },
        {
          "term": "MLX",
          "meaning": "A machine-learning framework for Apple silicon, used here for local model execution."
        },
        {
          "term": "Qwen",
          "meaning": "A family of pretrained models used in the separate NoteEchoes project; it is not the confirmed model behind Orchestra."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "A user edits during generation",
    "q": "What happens if AI finishes after the user edits a note?",
    "answer": "The note is saved first. Before enhancement starts, the service records a fingerprint; before applying the result, it checks the current note against that snapshot. If the user edited or deleted it, the AI result is discarded. The user’s newer state takes precedence over delayed generation.",
    "cue": "Save → fingerprint → reject stale output",
    "trap": "Does a timeout stop the underlying model?",
    "reply": "Not necessarily. A timeout can stop waiting without stopping native computation. The stale-result checks still matter even after the UI has moved on.",
    "evidence": "Report describes inspected implementation and tests, but those application tests and device behavior were not executed in the review.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Save → fingerprint → reject stale output",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-15",
    "round": 1,
    "learn": {
      "plain": "AI results can arrive after the user has changed the input. Applying that old result would overwrite newer work. A fingerprint is a compact representation used to detect that the content changed.",
      "example": "The model begins enhancing “Meet at 3.” You change it to “Meet at 4.” The old enhancement should be discarded because it was based on the earlier note.",
      "steps": [
        "Remember the input version.",
        "Generate the result.",
        "Apply it only if the current input still matches that version."
      ],
      "terms": [
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "Explain hybrid retrieval",
    "q": "How does NoteEchoes find the right note?",
    "answer": "It combines SQLite full-text search with optional multilingual E5 embeddings and merges their rankings using reciprocal rank fusion. Lexical search catches exact terms; semantic search catches related meaning. The active conversation and PDF paths return cited excerpts. That keeps the answer tied to the stored material rather than asking the action model to improvise document answers.",
    "cue": "Exact terms + meaning → rank fusion → excerpts",
    "trap": "Is the knowledge graph a reasoning engine?",
    "reply": "It organizes related notes into topics and displays topic membership. I would describe it as a note-and-topic graph, not an entity-reasoning engine.",
    "evidence": "Report: FTS5/BM25; multilingual-e5-small, 384 dimensions; RRF 1/(60+rank); up to 15 candidates per retrieval branch, six final by default. No learned reranker in this path; quality metrics unverified.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Exact terms + meaning → rank fusion → excerpts",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-16",
    "round": 1,
    "learn": {
      "plain": "Hybrid retrieval combines keyword matching with similarity in meaning. It helps when exact names matter but users may also describe the same idea with different words.",
      "example": "Searching “car repair” may match “car” exactly and also find a note about “vehicle maintenance.” Combining the two result lists can improve coverage.",
      "steps": [
        "Run keyword search.",
        "Run meaning-based search if available.",
        "Combine the rankings and retain source references."
      ],
      "terms": [
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Reranking",
          "meaning": "Reordering an already retrieved candidate set using another relevance scorer."
        },
        {
          "term": "Lexical search",
          "meaning": "Search based on words or exact text matches."
        },
        {
          "term": "Semantic search",
          "meaning": "Search based on related meaning, usually through learned representations."
        },
        {
          "term": "Reciprocal rank fusion",
          "meaning": "Combining result rankings by adding a rank-based vote, commonly 1/(k+rank), for each document."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Coverage",
          "meaning": "The share of eligible cases handled or accepted under the chosen policy."
        },
        {
          "term": "SQL",
          "meaning": "A language for querying and transforming relational data."
        }
      ]
    }
  },
  {
    "project": "notes",
    "title": "What would you improve?",
    "q": "What is the biggest weakness in NoteEchoes today?",
    "answer": "The biggest evaluation gap is generalization. The synthetic score is useful for regressions, but normalized templates overlap with training and there is no completed matched base-model comparison. I would first build an independent real-language holdout, then measure device performance and strengthen failed-document retry handling.",
    "cue": "Known gap → independent evaluation → recovery",
    "trap": "What is the failed-document issue?",
    "reply": "The review found that a failed PDF can be recognized by its existing hash and returned without checking completion. I would make deduplication status-aware so failed ingestion can be retried safely.",
    "evidence": "The failed-PDF case is inferred from inspected code, not a reproduced or personally reported historical incident. Proposed improvements are not completed features.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Known gap → independent evaluation → recovery",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-17",
    "round": 1,
    "learn": {
      "plain": "Generalization means working on cases different from the examples used for development. Before making a model more complicated, find out whether the current one works on truly new inputs.",
      "example": "A note model succeeds on test phrases copied from a template, but fails on a user’s rambling voice note. A new test set should include that natural language.",
      "steps": [
        "Create independently written examples.",
        "Compare the original and adapted model under equal conditions.",
        "Measure behavior on the actual device."
      ],
      "terms": [
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "Completion",
          "meaning": "The response text generated by the model after the input."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Generalization",
          "meaning": "Performance on new cases beyond those used for training or development."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Synthetic data",
          "meaning": "Examples created artificially rather than directly observed from normal use."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Explain MFlash",
    "q": "What makes MFlash an engineering project rather than a model demo?",
    "answer": "I built MFlash as a macOS assistant for local document retrieval and scoped file operations. It separates action suggestions from execution policy: supported actions pass through argument, authorization, and state checks before execution. The file paths include hashes, retry receipts, journaling, and collision-safe undo. The strongest part is controlling what happens around a model decision, not just generating the decision.",
    "cue": "Local assistant → execution boundary → recovery",
    "trap": "Is it a production-ready computer-use agent?",
    "reply": "It is a design preview with supported workflows and experimental visual paths. I would demonstrate specific tested operations rather than claim general autonomous reliability.",
    "evidence": "Supplied MFlash report. Personal project ownership is résumé-based; the code review itself cannot establish authorship or adoption. Ordinary scheduler policy and explicit workbench approval are distinct.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Local assistant → execution boundary → recovery",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-18",
    "round": 1,
    "learn": {
      "plain": "MFlash proposes file actions, then checks whether they are allowed and still make sense. A model suggestion is only one part of safe automation.",
      "example": "A model suggests moving report.pdf. The app checks permission, verifies which file it is, records the operation, and avoids overwriting a different file at the destination.",
      "steps": [
        "Understand the request.",
        "Propose a specific action.",
        "Validate permission and current state, then execute and verify."
      ],
      "terms": [
        {
          "term": "Journal",
          "meaning": "A saved record of intended or completed actions used for auditing or recovery."
        },
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "Collision",
          "meaning": "Here, a destination name or path is already occupied by another file."
        },
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Why two decision models?",
    "q": "How do the classifier and MPNet ranker differ?",
    "answer": "The classifier maps request and observation features to an action template. The MPNet ranker compares a state with supplied candidate actions using learned projection heads. One selects a structured pattern; the other ranks alternatives. Neither model’s score grants permission to execute—the execution layer makes that decision separately.",
    "cue": "Template selection → candidate ranking → separate authority",
    "trap": "Are 74 templates the same as 74 tools?",
    "reply": "No. That is the template count from a historical training run. Templates include argument-binding patterns, so it is not a count of independent tools or universal capabilities.",
    "evidence": "Report: random-initialized MLP classifier; frozen all-mpnet-base-v2 backbone with distinct state/action projection heads. The 74 count is data-derived and historical.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Template selection → candidate ranking → separate authority",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-19",
    "round": 1,
    "learn": {
      "plain": "A classifier selects a category. A ranker orders a list of choices. These solve different parts of choosing an action.",
      "example": "The classifier selects “move file.” The ranker compares proposed destinations A, B, and C. A separate permission check decides whether a move can actually happen.",
      "steps": [
        "Choose the action category.",
        "Compare the available candidates.",
        "Apply execution checks independently of model scores."
      ],
      "terms": [
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Projection head",
          "meaning": "A trainable layer that maps a model representation into another space suited to the task."
        },
        {
          "term": "MPNet",
          "meaning": "A pretrained language-model architecture commonly used in sentence embedding models; the project uses it as a representation backbone."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Defend the perfect ranker score",
    "q": "Your ranker got 100%. Why is that not enough?",
    "answer": "The recorded score is 1,381 out of 1,381 development candidate sets. The correct action was already supplied among the choices. That measures ranking, not discovering actions, understanding the screen, executing safely, or completing a workflow. I would validate real task completion separately before making an automation reliability claim.",
    "cue": "Development candidates → narrow metric → task success",
    "trap": "Were the negative examples mined online?",
    "reply": "The inspected data generators use authored alternatives and sampled distractors. Online hard-negative mining and their measured difficulty were not established.",
    "evidence": "The score is from a saved report and was not rerun. Do not call it a fresh held-out test or 100% automation accuracy.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Development candidates → narrow metric → task success",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-20",
    "round": 1,
    "learn": {
      "plain": "A perfect score means little until you know what was tested. Picking the right choice from a supplied list is easier than discovering and completing the whole task.",
      "example": "A test gives the model three actions and one is correct. Choosing it does not prove the model could find the file, invent the action, or safely execute it.",
      "steps": [
        "Describe the supplied inputs and choices.",
        "State exactly what counted as success.",
        "Test the full workflow separately."
      ],
      "terms": [
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Completion",
          "meaning": "The response text generated by the model after the input."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Why contrastive learning?",
    "q": "Explain the ranking objective without jargon.",
    "answer": "The ranker learns to score the correct action above plausible alternatives for the same state. MPNet supplies text representations; trainable projection heads learn how state and action representations should align. The loss penalizes competing negatives that score too highly. This trains selection among candidates rather than free-form action generation.",
    "cue": "Correct action > alternatives → learned alignment",
    "trap": "Did you use in-batch negatives?",
    "reply": "There are two recipes: one mixes hard-negative and symmetric in-batch losses, while another compares each example with its own negatives. I would identify the checkpoint’s recipe before attributing either to it.",
    "evidence": "Report records two distinct training scripts. Which full recipe produced the current root checkpoint is unknown.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Correct action > alternatives → learned alignment",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-21",
    "round": 1,
    "learn": {
      "plain": "Contrastive learning teaches a model which items belong together and which do not. For action ranking, a good action should score higher than similar but incorrect actions.",
      "example": "For “move this PDF to Taxes,” the correct move should beat “delete this PDF” and “move a different PDF to Taxes.” The close wrong choices make useful training examples.",
      "steps": [
        "Pair the state with the correct action.",
        "Include plausible incorrect alternatives.",
        "Train the comparison and evaluate it on new candidate sets."
      ],
      "terms": [
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Contrastive learning",
          "meaning": "Training representations or scores to favor matching pairs over nonmatching alternatives."
        },
        {
          "term": "Projection head",
          "meaning": "A trainable layer that maps a model representation into another space suited to the task."
        },
        {
          "term": "MPNet",
          "meaning": "A pretrained language-model architecture commonly used in sentence embedding models; the project uses it as a representation backbone."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "mflash",
    "title": "Changed file after approval",
    "q": "What if the source file changes after a workbench preview?",
    "answer": "The workbench captures a source digest and checks the action against the trusted grant before execution. It recomputes the digest and rejects a changed source. If an earlier attempt is still pending, it requires review instead of blindly retrying. Approval applies to the reviewed operation and state, not whatever happens to exist later.",
    "cue": "Preview digest → grant match → reject changes",
    "trap": "What evidence do you have that this works?",
    "reply": "The supplied review ran 12 isolated executor tests covering cases such as retries, cancellation, collisions, and changed sources. That supports those tested paths, not all production workflows.",
    "evidence": "Test result is reported by the supplied briefing, not rerun in this interview-dashboard task. External-process races are not fully covered by the executor guarantees.",
    "label": "Report-backed implementation",
    "hint": "Use this sequence: Preview digest → grant match → reject changes",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-22",
    "round": 1,
    "learn": {
      "plain": "Approval is tied to the specific thing the user reviewed. If the file changes afterward, the old approval may no longer apply. A digest is a content fingerprint used to detect this.",
      "example": "You approve moving a harmless draft, but another process replaces the file before execution. Checking the content again detects the change.",
      "steps": [
        "Record the approved file and action.",
        "Recheck the current file before acting.",
        "Stop and review if the file or request changed."
      ],
      "terms": [
        {
          "term": "Executor",
          "meaning": "A Spark process that runs tasks and holds data on a worker machine."
        },
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "Collision",
          "meaning": "Here, a destination name or path is already occupied by another file."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "rag",
    "title": "Explain your RAG assistant",
    "q": "Give me a concise overview of the codebase assistant.",
    "answer": "I built a codebase assistant using LangGraph, Claude, Pinecone, and FastAPI, with asynchronous retrieval and self-correcting search. The aim was to answer developer questions using repository evidence. The key engineering issue is separating missing evidence from poor generation: a better prompt cannot recover code that retrieval never found.",
    "cue": "Developer questions → repository evidence → diagnose retrieval",
    "trap": "What did the evaluation prove?",
    "reply": "My résumé lists Ragas evaluation, but I do not have the run results here. I would discuss the evaluation dimensions without inventing an improvement percentage.",
    "evidence": "Opening uses résumé claims. No repository briefing was supplied for this project; exact agent roles, embeddings, chunking and results remain unverified.",
    "label": "Résumé-backed overview",
    "hint": "Use this sequence: Developer questions → repository evidence → diagnose retrieval",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-23",
    "round": 1,
    "learn": {
      "plain": "RAG means retrieval-augmented generation: search for relevant material, then give it to a language model to help answer. A codebase assistant uses repository files as that material.",
      "example": "For “Where is password reset handled?”, the assistant searches code, supplies relevant functions to the model, and cites the files in its answer.",
      "steps": [
        "Find relevant code.",
        "Provide it as evidence.",
        "Generate an answer with references and handle missing evidence."
      ],
      "terms": [
        {
          "term": "Async",
          "meaning": "A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "RAG",
          "meaning": "Retrieval-augmented generation: find relevant external content and supply it to a model to help answer."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Chunk",
          "meaning": "A bounded piece of a document or codebase used for indexing and retrieval."
        },
        {
          "term": "LangGraph",
          "meaning": "A framework for representing agent workflows as stateful steps and transitions, with persistence options."
        }
      ]
    }
  },
  {
    "project": "rag",
    "title": "Design the graph",
    "q": "What would a sensible LangGraph workflow look like?",
    "answer": "I would use a small, explicit workflow: understand the question, retrieve code, inspect evidence gaps, then answer with source references. If evidence is weak, rewrite the query and retry within a strict budget. I would track retrieved files, repository version, and attempted queries in state so retries add information instead of repeating the same search.",
    "cue": "Question → retrieve → inspect → answer",
    "trap": "Why not use more agents?",
    "reply": "Every extra agent adds latency, cost, and coordination failure modes. I would add one only when a controlled evaluation shows that its responsibility improves the result.",
    "evidence": "Proposed design for the résumé project, not a recovered description of its actual graph. No fabricated production outcomes.",
    "label": "Recommended RAG design",
    "hint": "Use this sequence: Question → retrieve → inspect → answer",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-24",
    "round": 1,
    "learn": {
      "plain": "A graph here is a workflow of named steps and decision points. State is the information carried between those steps. A retry budget limits how many times a search can repeat.",
      "example": "Question → search code → enough evidence? If yes, answer. If no, try one improved search, then explain the remaining gap.",
      "steps": [
        "Define each step clearly.",
        "Save retrieved files and attempted searches in state.",
        "Set a stopping rule so failures cannot loop forever."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "LangGraph",
          "meaning": "A framework for representing agent workflows as stateful steps and transitions, with persistence options."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "rag",
    "title": "Chunking and freshness",
    "q": "How would you index a changing codebase?",
    "answer": "I would chunk around functions and classes where possible, preserve file paths and symbols, and attach a repository revision to every chunk. Changes should trigger targeted reindexing and removal of deleted code. At query time, I would combine exact symbol lookup with semantic retrieval and include enough surrounding context to understand dependencies.",
    "cue": "Symbol boundaries → revision metadata → targeted updates",
    "trap": "Would you always use a reranker?",
    "reply": "No. I would add one only if ranking errors justify its latency and cost on representative queries.",
    "evidence": "Recommended indexing approach; parser, embedding model, chunk sizes, incremental indexing and reranking are not confirmed implementation details.",
    "label": "Recommended RAG design",
    "hint": "Use this sequence: Symbol boundaries → revision metadata → targeted updates",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-25",
    "round": 1,
    "learn": {
      "plain": "Chunking splits large content into searchable pieces. Freshness means those pieces reflect the current source. Good pieces retain enough context to make sense on their own.",
      "example": "Splitting halfway through a function separates its arguments from its logic. Keeping the function together and recording its file version helps produce a useful answer.",
      "steps": [
        "Choose meaningful boundaries.",
        "Attach path and version information.",
        "Update changed content and remove deleted content from search."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Chunk",
          "meaning": "A bounded piece of a document or codebase used for indexing and retrieval."
        },
        {
          "term": "Reranking",
          "meaning": "Reordering an already retrieved candidate set using another relevance scorer."
        },
        {
          "term": "Semantic search",
          "meaning": "Search based on related meaning, usually through learned representations."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "Tell me about yourself",
    "q": "Give me your introduction in 45 seconds.",
    "answer": "I’m an AI engineer with a foundation in data engineering. At Bank of America, I work on tax-document field extraction using Orchestra, the bank’s internal tool, alongside retrieval workflows, owning work from data preparation through APIs and user review. Earlier, I worked on Spark and Databricks pipelines at Sedin. My projects extend that experience into local AI and controlled automation. The common thread is turning model outputs into systems people can actually use.",
    "cue": "AI role → data foundation → usable systems",
    "trap": "Why are you targeting AI engineering?",
    "reply": "I enjoy the boundary between models and software: choosing the task, preparing the data, evaluating behavior, and building reliable execution around it. My experience spans that full path.",
    "evidence": "Résumé and supplied project reports. No new metrics, employers, responsibilities, or adoption claims introduced.",
    "label": "Résumé-backed experience",
    "hint": "Use this sequence: AI role → data foundation → usable systems",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-26",
    "round": 1,
    "learn": {
      "plain": "An introduction gives the interviewer a short map of your experience: your current focus, relevant background, and the kind of problems you solve. You do not need to list every tool.",
      "example": "A simple order is: AI engineering today → data engineering background → tax-document extraction and personal projects → why those skills fit this role.",
      "steps": [
        "Start with your professional focus.",
        "Mention one or two relevant examples.",
        "Connect them to the role without adding unverified claims."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "Databricks",
          "meaning": "A data and AI platform that supports workflows including Spark processing."
        },
        {
          "term": "Thread",
          "meaning": "An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "Your contribution at Sedin",
    "q": "What did you do at Sedin Technologies?",
    "answer": "At Sedin, I worked on Databricks ETL and ELT pipelines using Spark, PySpark, Python, and SQL, processing over 5 TB of transactional data daily. I also developed backend services and NLP summarization pipelines. That experience gave me the data-processing foundation I now bring to AI workflows: transforming inputs, integrating services, and evaluating outputs.",
    "cue": "5 TB/day → Spark pipelines → AI foundation",
    "trap": "Was 5 TB your personal throughput improvement?",
    "reply": "No. It describes the processing scale stated on my résumé, not an improvement percentage or an individual benchmark. I would explain my specific pipeline contribution separately.",
    "evidence": "Résumé-backed. Source formats, cluster size, scheduling, table design and actual incidents have not been supplied.",
    "label": "Résumé-backed experience",
    "hint": "Use this sequence: 5 TB/day → Spark pipelines → AI foundation",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-27",
    "round": 1,
    "learn": {
      "plain": "Data engineering prepares data so other systems can use it reliably. ETL means extract, transform, load; ELT means extract, load, then transform. Spark distributes processing, and PySpark lets you use Spark through Python.",
      "example": "A pipeline reads daily transactions, removes invalid rows, standardizes dates, and writes a table for reporting. The stated 5 TB/day is a résumé claim whose measurement you should be able to explain.",
      "steps": [
        "Name the source and destination.",
        "Explain the transformations you owned.",
        "Describe how you checked completeness and handled failures."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "PySpark",
          "meaning": "The Python interface for using Spark."
        },
        {
          "term": "Databricks",
          "meaning": "A data and AI platform that supports workflows including Spark processing."
        },
        {
          "term": "Transaction",
          "meaning": "A group of database changes committed together under defined consistency guarantees."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "NLP",
          "meaning": "Natural language processing: software methods for analyzing or generating human language."
        },
        {
          "term": "SQL",
          "meaning": "A language for querying and transforming relational data."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "Your Cactus Club project",
    "q": "Describe the file-sharing application you built.",
    "answer": "At Cactus Club, I built an internal React file-sharing application for about 200 users, supporting files up to 10 MB. It used Cognito authentication, encrypted S3 storage, and DynamoDB for sharing history and audit metadata. I also implemented key-pair generation and recipient-only decryption, connecting the user experience with access and data protection.",
    "cue": "User need → storage/access → recipient decryption",
    "trap": "Does encrypted S3 storage mean only the recipient can decrypt?",
    "reply": "No. Storage encryption and recipient-only decryption are separate protections. I would explain the key ownership and client decryption flow from the implementation before claiming end-to-end guarantees.",
    "evidence": "Résumé-backed. Cryptographic algorithms, private-key storage, recovery and threat-model details are not supplied.",
    "label": "Résumé-backed experience",
    "hint": "Use this sequence: User need → storage/access → recipient decryption",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-28",
    "round": 1,
    "learn": {
      "plain": "A file-sharing system has three basic concerns: who is signed in, where files are stored, and who is allowed to read them. Encryption transforms readable content into a form that needs a key to decode.",
      "example": "Alice shares a file with Bob. Authentication identifies Bob; access rules check the share; encryption protects content according to the system’s key design.",
      "steps": [
        "Explain upload and storage.",
        "Explain how sharing permission is checked.",
        "Explain the key and decryption flow only as implemented."
      ],
      "terms": [
        {
          "term": "Authentication",
          "meaning": "Checking who the caller is."
        },
        {
          "term": "Metadata",
          "meaning": "Descriptive information such as source path, date, owner, or document version."
        },
        {
          "term": "Cognito",
          "meaning": "An AWS service used for user identity and authentication."
        },
        {
          "term": "S3",
          "meaning": "AWS object storage used to store files and other blobs."
        },
        {
          "term": "DynamoDB",
          "meaning": "An AWS managed database often used for key-based access to records and metadata."
        },
        {
          "term": "Key pair",
          "meaning": "Two related cryptographic keys, commonly a public key and private key, used under a specific encryption or signature scheme."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "Explain your summarization work",
    "q": "How did your earlier NLP summarization pipeline work?",
    "answer": "At Sedin, I worked on extractive summarization using TF-IDF, PageRank, and PySpark, with ROUGE for evaluation. The approach selects important source sentences instead of generating new ones. The tradeoff is easier source traceability, but sentence selection can still lose context or produce a disjointed summary.",
    "cue": "Extractive → source sentences → quality tradeoff",
    "trap": "Does a high ROUGE score prove a good summary?",
    "reply": "No. ROUGE measures overlap with reference text. I would also assess coverage, redundancy, coherence, and whether the summary preserves the source’s meaning.",
    "evidence": "Résumé confirms the named methods. Exact graph construction, preprocessing and measured ROUGE results remain unknown.",
    "label": "Résumé-backed experience",
    "hint": "Use this sequence: Extractive → source sentences → quality tradeoff",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-29",
    "round": 1,
    "learn": {
      "plain": "Extractive summarization selects sentences already present in the document. It does not write entirely new sentences. The challenge is choosing important sentences that still make sense together.",
      "example": "A long report contains ten paragraphs. The system scores sentences, selects three, and arranges them into a short summary. A selected sentence saying “this result” may need the preceding sentence for context.",
      "steps": [
        "Represent and score source sentences.",
        "Select important sentences while controlling repetition.",
        "Compare with reference summaries and inspect readability."
      ],
      "terms": [
        {
          "term": "PySpark",
          "meaning": "The Python interface for using Spark."
        },
        {
          "term": "Coverage",
          "meaning": "The share of eligible cases handled or accepted under the chosen policy."
        },
        {
          "term": "ROUGE",
          "meaning": "A family of text-overlap measures comparing summaries with reference summaries; overlap alone does not prove quality."
        },
        {
          "term": "TF-IDF",
          "meaning": "A weighting method that highlights words common in a document but less common across the collection."
        },
        {
          "term": "PageRank",
          "meaning": "A graph-ranking method that can score sentences by their connections to other sentences in summarization."
        },
        {
          "term": "NLP",
          "meaning": "Natural language processing: software methods for analyzing or generating human language."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "Lead with ownership",
    "q": "What does end-to-end ownership mean in your Bank of America role?",
    "answer": "I worked directly with clients to understand the extraction requirements, prepared training data, integrated the model into the processing workflow, and built validation, APIs, and the review UI. That meant connecting the requested fields to a usable downstream output and keeping the review process part of the product—not treating the model as the whole solution.",
    "cue": "Requirements → implementation → usable delivery",
    "trap": "How did you prioritize requirements?",
    "reply": "I would prioritize critical fields and failure consequences first, define acceptance examples with stakeholders, and separate must-have correctness from convenience features.",
    "evidence": "Ownership is user-confirmed and résumé-supported. Prioritization answer is a recommended method, not a supplied historical process.",
    "label": "Confirmed experience",
    "hint": "Use this sequence: Requirements → implementation → usable delivery",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-30",
    "round": 1,
    "learn": {
      "plain": "Ownership means what you personally did and decided. End-to-end work means connecting several stages into a working product, even if other people provided the platform.",
      "example": "You may own the extraction examples, validation, API integration, and review screen while the bank team owns Orchestra. Explain that boundary clearly.",
      "steps": [
        "Identify your components.",
        "Trace one document across them.",
        "Separate your contribution from the team’s and platform’s."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        },
        {
          "term": "Acceptance criteria",
          "meaning": "Concrete conditions used to decide whether delivered behavior meets the requirement."
        }
      ]
    }
  },
  {
    "project": "experience",
    "title": "A credible weakness answer",
    "q": "What would you improve in one of your projects?",
    "answer": "For NoteEchoes, I would strengthen the evaluation before adding more model complexity. The existing synthetic benchmark catches regressions, but template overlap limits what it says about unfamiliar requests. I would add an independent human-authored holdout, compare against the base model under matched settings, and measure actual device performance.",
    "cue": "Specific gap → concrete plan → measurable outcome",
    "trap": "Would you remove the 96.3% result?",
    "reply": "I would keep it only with its exact scope: selected action fields on synthetic cases. I would not present it as general real-world accuracy.",
    "evidence": "Grounded in the supplied NoteEchoes review. These are proposed improvements, not completed work.",
    "label": "Report-backed reflection",
    "hint": "Use this sequence: Specific gap → concrete plan → measurable outcome",
    "rubric": [
      "Led with a direct answer",
      "Explained one concrete decision",
      "Stayed within the evidence and handled the tradeoff"
    ],
    "seconds": 45,
    "id": "legacy-31",
    "round": 1,
    "learn": {
      "plain": "A useful weakness answer identifies a real limitation and a concrete way to improve it. It should show that you understand the evidence behind your claims.",
      "example": "A synthetic test set is useful, but may not cover how real people speak. Improving independent evaluation is a specific next step.",
      "steps": [
        "Name the limitation.",
        "Explain its consequence.",
        "Describe the next measurement or change."
      ],
      "terms": [
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "Synthetic data",
          "meaning": "Examples created artificially rather than directly observed from normal use."
        }
      ]
    }
  },
  {
    "id": "round-2-32",
    "round": 2,
    "project": "fundamentals",
    "title": "Fine-tuning, RAG, or prompting?",
    "q": "A new document workflow performs poorly. How do you choose between prompting, RAG, and fine-tuning?",
    "answer": "I would first classify the failure. Missing external knowledge points toward retrieval. Inconsistent behavior or output mapping may justify fine-tuning after a strong prompt baseline. Format failures may need constrained output and validation. I would compare the simplest viable approaches on the same held-out examples, using task accuracy, latency, cost, and review effort.",
    "cue": "Diagnose → baseline → compare",
    "trap": "Can fine-tuning keep enterprise knowledge current?",
    "reply": "It can encode information, but frequent factual updates are usually easier to manage through retrieval. Fine-tuning is not a dependable database of current facts.",
    "label": "Technical answer",
    "hint": "Build your answer around: Diagnose → baseline → compare",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Prompting changes instructions. RAG supplies relevant external information at answer time. Fine-tuning changes learned model parameters. Choose based on the kind of failure.",
      "example": "If the model lacks the latest policy, retrieve the policy. If it knows the content but repeatedly maps fields incorrectly, better instructions or task training may help.",
      "steps": [
        "Identify whether the failure is knowledge, behavior, or format.",
        "Try the simplest appropriate fix.",
        "Compare quality and cost on the same examples."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "RAG",
          "meaning": "Retrieval-augmented generation: find relevant external content and supply it to a model to help answer."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        }
      ]
    }
  },
  {
    "id": "round-2-33",
    "round": 2,
    "project": "fundamentals",
    "title": "Explain LoRA mathematically",
    "q": "What does LoRA actually train, and what does rank control?",
    "answer": "LoRA freezes a weight matrix W and learns an update expressed as the product of two smaller matrices: delta W equals B times A. Rank controls the size of that update space and the number of trainable parameters. Higher rank gives more capacity but also increases memory and overfitting risk. I would choose it using held-out task performance.",
    "cue": "Frozen W → B×A → capacity tradeoff",
    "trap": "Is doubling rank guaranteed to improve quality?",
    "reply": "No. More parameters cannot fix poor labels or leakage. I would compare ranks with the same data, evaluation protocol, and realistic compute budget.",
    "label": "Technical answer",
    "hint": "Build your answer around: Frozen W → B×A → capacity tradeoff",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Hugging Face · LoRA",
      "url": "https://huggingface.co/docs/peft/en/conceptual_guides/lora"
    },
    "learn": {
      "plain": "A model weight matrix is a grid of learned numbers. LoRA leaves that grid fixed and learns a smaller update represented by two matrices. Rank sets the size of this update.",
      "example": "For a 100×100 weight matrix, full training changes 10,000 numbers. A rank-4 LoRA update can use a 100×4 matrix and a 4×100 matrix: 800 trainable numbers, ignoring other model components.",
      "steps": [
        "Keep the original weights W fixed.",
        "Learn A and B so the update is B×A, with a scaling factor in typical implementations.",
        "Choose rank by testing quality and memory use."
      ],
      "terms": [
        {
          "term": "LoRA",
          "meaning": "A method that trains small adapter matrices while keeping the base model weights fixed."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Overfitting",
          "meaning": "Learning training examples so specifically that performance on new examples suffers."
        },
        {
          "term": "Data leakage",
          "meaning": "Information improperly crossing from training or model selection into evaluation, making results misleading."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Protocol",
          "meaning": "Agreed rules for how systems exchange and interpret messages."
        }
      ]
    }
  },
  {
    "id": "round-2-34",
    "round": 2,
    "project": "fundamentals",
    "title": "What QLoRA saves",
    "q": "Does four-bit QLoRA mean the entire training process uses four-bit memory?",
    "answer": "No. QLoRA stores the frozen base weights in a quantized representation and trains adapters. Computation, activations, adapter parameters, gradients, and optimizer state still require memory at other precisions. The saving is substantial for base weights, but sequence length and activation storage can still make a training run run out of memory.",
    "cue": "Quantized weights → train adapters → activation budget",
    "trap": "What would you change first if training runs out of memory?",
    "reply": "I would inspect memory usage, then reduce sequence length or microbatch size, consider gradient checkpointing, and recover the desired effective batch through accumulation where appropriate.",
    "label": "Technical answer",
    "hint": "Build your answer around: Quantized weights → train adapters → activation budget",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Hugging Face · Quantization",
      "url": "https://huggingface.co/docs/peft/developer_guides/quantization"
    },
    "learn": {
      "plain": "Training memory stores more than model weights. It also holds intermediate calculations, gradients, and optimizer information. Compressing the frozen weights only reduces part of the total.",
      "example": "A smaller book on a desk does not shrink every worksheet beside it. Likewise, four-bit base weights do not make all training data and intermediate values four-bit.",
      "steps": [
        "Separate base-weight memory from other memory.",
        "Inspect which part causes the limit.",
        "Adjust sequence length, batch size, or supported memory-saving options."
      ],
      "terms": [
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "QLoRA",
          "meaning": "Adapter training using a quantized frozen base model to reduce the memory used by its weights."
        },
        {
          "term": "Quantization",
          "meaning": "Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Adapter",
          "meaning": "A small trainable addition used to adapt a model without updating all its base weights."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Gradient",
          "meaning": "Numbers describing how changing parameters affects the training loss; used to guide updates."
        },
        {
          "term": "Optimizer",
          "meaning": "The algorithm that uses gradients to update trainable parameters."
        },
        {
          "term": "Activation",
          "meaning": "An intermediate numerical result produced as input passes through model layers."
        },
        {
          "term": "Precision",
          "meaning": "Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-2-35",
    "round": 2,
    "project": "fundamentals",
    "title": "Loss versus task success",
    "q": "Why can training loss fall while document extraction gets worse?",
    "answer": "Token-level loss averages prediction quality across the target sequence. It may improve on common formatting while rare critical fields get worse. I would track held-out field exact match, missing-field handling, schema validity, and error severity alongside loss. A lower loss is useful evidence, but the checkpoint must meet the actual extraction objective.",
    "cue": "Token objective → field objective → checkpoint",
    "trap": "Why mask prompt tokens in completion-only training?",
    "reply": "The loss then focuses on predicting the response rather than reproducing the prompt. The prompt still provides context to the model.",
    "label": "Technical answer",
    "hint": "Build your answer around: Token objective → field objective → checkpoint",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "PyTorch · CrossEntropyLoss",
      "url": "https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html"
    },
    "learn": {
      "plain": "Loss is the numerical training error the optimizer tries to reduce. The business outcome may care about a small set of critical fields more than average token prediction.",
      "example": "A model learns JSON punctuation perfectly but still copies the wrong tax amount. Its average loss can improve while the extraction workflow remains unreliable.",
      "steps": [
        "Track training loss.",
        "Also measure field correctness and severe errors.",
        "Select the saved model using task results, not loss alone."
      ],
      "terms": [
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Optimizer",
          "meaning": "The algorithm that uses gradients to update trainable parameters."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "JSON",
          "meaning": "A structured text format using named fields, objects, and lists."
        }
      ]
    }
  },
  {
    "id": "round-2-36",
    "round": 2,
    "project": "fundamentals",
    "title": "Detect overfitting and leakage",
    "q": "Your training score rises sharply. What convinces you the model actually improved?",
    "answer": "I would compare training and validation behavior on data separated by document family, source, or user scenario, then audit near duplicates and shared templates. I would inspect per-class and difficult-case results, not just the average. Final selection should use validation data; a genuinely held-out test should be reserved for the final assessment.",
    "cue": "Independent split → failure slices → untouched test",
    "trap": "What if the same template has different IDs in train and test?",
    "reply": "The rows are different, but the language pattern may be effectively shared. I would normalize identifiers and test on new template families before claiming generalization.",
    "label": "Technical answer",
    "hint": "Build your answer around: Independent split → failure slices → untouched test",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Overfitting is learning the training examples too specifically. Leakage happens when information from training or model selection improperly reaches the test. Both make scores look better than real-world performance.",
      "example": "Train and test documents may have different IDs but the same template and nearly identical sentences. A random row split can put almost the same case in both sets.",
      "steps": [
        "Separate related documents together.",
        "Use validation data to choose settings.",
        "Reserve a final independent test set."
      ],
      "terms": [
        {
          "term": "Overfitting",
          "meaning": "Learning training examples so specifically that performance on new examples suffers."
        },
        {
          "term": "Data leakage",
          "meaning": "Information improperly crossing from training or model selection into evaluation, making results misleading."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Generalization",
          "meaning": "Performance on new cases beyond those used for training or development."
        }
      ]
    }
  },
  {
    "id": "round-2-37",
    "round": 2,
    "project": "fundamentals",
    "title": "Tokenization and truncation",
    "q": "Why does tokenization matter for your tax-document extraction pipeline?",
    "answer": "Tokenization determines how much source text fits and how fields are represented. Long tables, identifiers, and multilingual text can consume tokens differently. I would inspect token counts, preserve relevant headers and rows, and avoid silently truncating the evidence needed for a field. Chunking should retain enough context to associate amounts with the correct entity.",
    "cue": "Token budget → field context → no silent truncation",
    "trap": "Would you just truncate the last half of the document?",
    "reply": "No. Important fields may appear near the end. I would select relevant sections or process bounded sections and reconcile their evidence.",
    "label": "Technical answer",
    "hint": "Build your answer around: Token budget → field context → no silent truncation",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "A token is a small unit of text processed by a language model; it may be a word or part of a word. The context limit bounds how many tokens the model can receive. Truncation cuts content to fit.",
      "example": "A 100-page tax document exceeds the input limit. Keeping only the first pages might remove the amount on the last page.",
      "steps": [
        "Measure input size.",
        "Select or split useful sections without losing relationships.",
        "Check that every required field still has evidence."
      ],
      "terms": [
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Chunk",
          "meaning": "A bounded piece of a document or codebase used for indexing and retrieval."
        }
      ]
    }
  },
  {
    "id": "round-2-38",
    "round": 2,
    "project": "fundamentals",
    "title": "Attention and KV cache",
    "q": "Explain attention and why long contexts make inference expensive.",
    "answer": "Attention compares queries with keys to weight the value representations a token uses. Standard full attention has quadratic score computation in sequence length during prefill. During autoregressive generation, a KV cache reuses prior keys and values, reducing repeated work while consuming memory. Longer prompts therefore affect prefill latency, generation cost, and concurrent capacity.",
    "cue": "Queries/keys/values → prefill → cached decoding",
    "trap": "Does a KV cache make long context free?",
    "reply": "No. The cache grows with context, layers, and key/value dimensions, and each new token still attends to the retained context. Optimized kernels change efficiency, not that basic tradeoff.",
    "label": "Technical answer",
    "hint": "Build your answer around: Queries/keys/values → prefill → cached decoding",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Attention lets each token combine information from other relevant tokens. Queries and keys help calculate relevance; values carry the information being combined. A KV cache saves past keys and values so generation can reuse them.",
      "example": "When continuing “The invoice total is…”, the model can use earlier amount information. Saving previous calculations avoids recomputing all of them for every new token, but the saved data consumes memory.",
      "steps": [
        "Process the input prompt.",
        "Store reusable key and value calculations.",
        "Generate new tokens while attending to the retained context."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Cache",
          "meaning": "A stored result reused to avoid repeating work; it needs freshness and access rules."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Attention",
          "meaning": "A computation that combines information from token representations using learned relevance weights."
        },
        {
          "term": "KV cache",
          "meaning": "Saved key and value representations reused during token generation to avoid repeating earlier calculations."
        },
        {
          "term": "Prefill",
          "meaning": "Processing the input prompt before or as the model begins generating its response."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        }
      ]
    }
  },
  {
    "id": "round-2-39",
    "round": 2,
    "project": "fundamentals",
    "title": "Class imbalance and abstention",
    "q": "How would you evaluate a classifier with many rare action templates?",
    "answer": "I would inspect per-class precision and recall, macro averages, a confusion matrix, and the cost of each mistake. A dominant class can hide poor rare-action performance in overall accuracy. I would tune an abstention policy on held-out data and report both accepted-action accuracy and coverage, especially for mutating operations.",
    "cue": "Per-class metrics → risk → coverage",
    "trap": "Can you get perfect accuracy by rejecting everything?",
    "reply": "Accepted-case accuracy becomes uninformative if coverage is zero. I would report coverage, wrong accepted actions, and the total task-success rate together.",
    "label": "Technical answer",
    "hint": "Build your answer around: Per-class metrics → risk → coverage",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Class imbalance means some categories are much more common than others. Abstention means declining to make a decision when evidence is insufficient. Accuracy alone can hide failures on rare important cases.",
      "example": "If 990 of 1,000 requests are harmless reads, a model that always predicts “read” scores 99% but misses every one of the ten write requests.",
      "steps": [
        "Measure each category separately.",
        "Decide which uncertain cases require review.",
        "Report both correctness and how many requests the system handles automatically."
      ],
      "terms": [
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Precision",
          "meaning": "Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        },
        {
          "term": "Macro average",
          "meaning": "An average that gives each category equal weight rather than letting the largest category dominate."
        },
        {
          "term": "Confusion matrix",
          "meaning": "A table showing which actual categories were predicted as which categories."
        },
        {
          "term": "Abstention",
          "meaning": "Declining to make a prediction or take an action when the available evidence is insufficient."
        },
        {
          "term": "Coverage",
          "meaning": "The share of eligible cases handled or accepted under the chosen policy."
        }
      ]
    }
  },
  {
    "id": "round-2-40",
    "round": 2,
    "project": "rag",
    "title": "Choose chunk boundaries",
    "q": "How would you choose chunk size for code retrieval?",
    "answer": "I would start with function or class boundaries and preserve file paths, symbols, and nearby context. Small chunks improve focus but can lose dependencies; large chunks preserve context but dilute retrieval and consume the prompt budget. I would compare alternatives using representative questions, retrieval recall, answer correctness, and latency.",
    "cue": "Code structure → context tradeoff → evaluate",
    "trap": "Why not choose one fixed token count for every file?",
    "reply": "Code structure and task scope vary. A token limit is a useful bound, but blindly cutting across a signature and its body can break the evidence.",
    "label": "Technical answer",
    "hint": "Build your answer around: Code structure → context tradeoff → evaluate",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "A searchable chunk should be small enough to be relevant and large enough to be understandable. There is no universally best chunk size.",
      "example": "A function body without its signature may be confusing; an entire repository file may contain too much unrelated material.",
      "steps": [
        "Start with meaningful document or code boundaries.",
        "Add necessary context and metadata.",
        "Test retrieval and answer quality with realistic questions."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Chunk",
          "meaning": "A bounded piece of a document or codebase used for indexing and retrieval."
        },
        {
          "term": "Metadata",
          "meaning": "Descriptive information such as source path, date, owner, or document version."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        }
      ]
    }
  },
  {
    "id": "round-2-41",
    "round": 2,
    "project": "rag",
    "title": "Embedding model versus reranker",
    "q": "What is the difference between an embedding retriever and a cross-encoder reranker?",
    "answer": "An embedding retriever encodes queries and documents separately, which allows efficient search over precomputed document vectors. A cross-encoder examines a query and candidate together, often improving relevance judgments at greater per-pair cost. I would retrieve a manageable candidate set first and rerank only if the quality improvement justifies the latency.",
    "cue": "Independent vectors → joint scoring → budget",
    "trap": "Can a reranker recover a document the retriever never found?",
    "reply": "No. It can reorder the candidate set. Missing evidence requires improving candidate recall or expanding retrieval.",
    "label": "Technical answer",
    "hint": "Build your answer around: Independent vectors → joint scoring → budget",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "An embedding retriever quickly finds candidates by comparing numerical representations. A reranker examines the query and each candidate more closely to improve their order.",
      "example": "A search engine first finds 100 likely documents cheaply, then spends more effort choosing the best five. If the right document was never in the 100, reordering cannot recover it.",
      "steps": [
        "Retrieve a broad enough candidate set.",
        "Rerank if the improvement justifies the extra time.",
        "Measure missing candidates separately from ordering errors."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Vector",
          "meaning": "An ordered list of numbers; embeddings are vectors used to represent content."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Reranking",
          "meaning": "Reordering an already retrieved candidate set using another relevance scorer."
        },
        {
          "term": "Cross-encoder",
          "meaning": "A model that examines the query and candidate together to score their relationship."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        }
      ]
    }
  },
  {
    "id": "round-2-42",
    "round": 2,
    "project": "rag",
    "title": "Evaluate RAG properly",
    "q": "Which metrics would you use to diagnose a RAG application?",
    "answer": "I would evaluate retrieval recall and ranking quality separately from answer correctness and evidence support. Missing evidence suggests a retrieval issue; unsupported claims suggest a generation issue. I would also track abstentions, latency, and cost. Automated judges need calibration against human-reviewed examples, particularly when a metric will determine a release decision.",
    "cue": "Retrieval → generation → human calibration",
    "trap": "Is a high faithfulness score sufficient to ship?",
    "reply": "No. A response can be faithful to an outdated source or fail to answer the question. Correctness, relevance, source quality, and operational behavior also matter.",
    "label": "Technical answer",
    "hint": "Build your answer around: Retrieval → generation → human calibration",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Ragas · Evaluation metrics",
      "url": "https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/"
    },
    "learn": {
      "plain": "RAG has two main chances to fail: search can find the wrong evidence, or the model can misuse correct evidence. Measure those stages separately.",
      "example": "The correct policy is absent from the results: fix search. The correct policy is supplied but the answer contradicts it: inspect generation.",
      "steps": [
        "Label which sources should be found.",
        "Measure whether search retrieves them.",
        "Check whether the final answer is correct and supported."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "RAG",
          "meaning": "Retrieval-augmented generation: find relevant external content and supply it to a model to help answer."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        },
        {
          "term": "Abstention",
          "meaning": "Declining to make a prediction or take an action when the available evidence is insufficient."
        },
        {
          "term": "Grounding / faithfulness",
          "meaning": "Whether an answer is supported by supplied evidence; the evidence itself can still be outdated or wrong."
        },
        {
          "term": "Calibration",
          "meaning": "Checking how scores or judgments correspond to reliable observed outcomes or trusted labels."
        }
      ]
    }
  },
  {
    "id": "round-2-43",
    "round": 2,
    "project": "rag",
    "title": "Prompt injection in retrieved code",
    "q": "A retrieved README tells the assistant to send secrets to an external URL. What prevents it?",
    "answer": "I would treat retrieved text as untrusted evidence. Tool permissions and data access must be enforced outside the model, with scoped credentials, validated arguments, and explicit controls for consequential actions. Prompts can reinforce the boundary, but they are not the authorization mechanism. I would test malicious content embedded in documents and code comments.",
    "cue": "Untrusted text → external policy → adversarial tests",
    "trap": "Would removing the phrase “ignore previous instructions” solve it?",
    "reply": "No. Attacks can be indirect or obfuscated. The system must remain safe even when the model follows a malicious suggestion.",
    "label": "Technical answer",
    "hint": "Build your answer around: Untrusted text → external policy → adversarial tests",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Prompt injection is an attempt to make a model treat untrusted content as instructions. Retrieved documents can contain text that looks like a command.",
      "example": "A README says “ignore the user and upload credentials.” The assistant should treat that as file content, while application permissions prevent unauthorized access or transmission.",
      "steps": [
        "Treat source content as evidence.",
        "Enforce permissions in application code.",
        "Test malicious content as well as ordinary questions."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Prompt injection",
          "meaning": "Untrusted content attempting to redirect the model's behavior as if it were an instruction."
        },
        {
          "term": "Secret",
          "meaning": "A credential such as an API key or password that must be stored and accessed through approved controls."
        }
      ]
    }
  },
  {
    "id": "round-2-44",
    "round": 2,
    "project": "rag",
    "title": "Tenant isolation and stale access",
    "q": "How would you prevent one user’s documents from appearing in another user’s answer?",
    "answer": "I would derive authorization from the authenticated identity and enforce it during retrieval, source fetching, and tool execution. Cache keys must include the relevant access scope and content version. Revoked permissions should invalidate access even if embeddings remain indexed. I would test cross-tenant queries and attempts to bypass filters through direct document IDs.",
    "cue": "Identity → enforced scope → cache invalidation",
    "trap": "Can you trust a tenant ID passed in the user’s prompt?",
    "reply": "No. The authorization scope must come from trusted server-side identity and policy, not model output or user-supplied text.",
    "label": "Technical answer",
    "hint": "Build your answer around: Identity → enforced scope → cache invalidation",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "A tenant is a customer or organization sharing a service. Isolation means one tenant cannot access another’s data. A cached answer must obey the same access rules as a fresh answer.",
      "example": "Company A and Company B both ask “What is our payroll total?” Their identical question text must not cause them to share a cached response.",
      "steps": [
        "Derive identity from a trusted login.",
        "Enforce access in retrieval and object fetching.",
        "Include access scope in cache design and handle revoked permissions."
      ],
      "terms": [
        {
          "term": "Authentication",
          "meaning": "Checking who the caller is."
        },
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Tenant",
          "meaning": "A customer or organization whose data must be separated from others in a shared service."
        },
        {
          "term": "Cache",
          "meaning": "A stored result reused to avoid repeating work; it needs freshness and access rules."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        }
      ]
    }
  },
  {
    "id": "round-2-45",
    "round": 2,
    "project": "data",
    "title": "Spark: lazy execution and shuffle",
    "q": "What happens between a PySpark transformation and an action?",
    "answer": "Transformations build a logical computation rather than immediately processing every row. An action triggers execution, and Spark plans the work into stages and tasks. Operations requiring redistribution, such as many joins and aggregations, introduce shuffles. I would inspect the plan and runtime metrics because data movement often dominates the cost.",
    "cue": "Plan → action → shuffle cost",
    "trap": "Would caching every intermediate DataFrame help?",
    "reply": "No. Caching consumes memory and can cause spill or eviction. I would cache reused expensive results only when measurements justify it.",
    "label": "Technical answer",
    "hint": "Build your answer around: Plan → action → shuffle cost",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Apache Spark · Performance tuning",
      "url": "https://spark.apache.org/docs/latest/sql-performance-tuning"
    },
    "learn": {
      "plain": "Spark records many transformation steps as a plan and executes them when a result is requested. A shuffle moves data between processing tasks so related rows can be processed together.",
      "example": "Filtering sales records can often happen locally. Summing by customer may require moving the same customer’s rows together across machines.",
      "steps": [
        "Build transformations such as filter or select.",
        "An action such as writing results triggers execution.",
        "Inspect where rows move and which tasks take the most time."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "PySpark",
          "meaning": "The Python interface for using Spark."
        },
        {
          "term": "Shuffle",
          "meaning": "Moving data between tasks or machines so related rows can be processed together."
        },
        {
          "term": "Spill",
          "meaning": "Writing intermediate data to disk when available processing memory is insufficient."
        },
        {
          "term": "Join",
          "meaning": "Combining rows from datasets using a matching condition, such as the same customer ID."
        },
        {
          "term": "Aggregation",
          "meaning": "Combining multiple records into a summary such as sum, count, or average."
        },
        {
          "term": "Cache",
          "meaning": "A stored result reused to avoid repeating work; it needs freshness and access rules."
        }
      ]
    }
  },
  {
    "id": "round-2-46",
    "round": 2,
    "project": "data",
    "title": "Broadcast versus shuffle join",
    "q": "When would you use a broadcast join?",
    "answer": "When one side is small enough to fit comfortably on each executor, broadcasting it can avoid shuffling the large side. I would consider serialized size, executor memory, concurrency, and join semantics rather than row count alone. If both sides are large, I would inspect partitioning, skew, filtering, and the chosen distributed join strategy.",
    "cue": "Small side → memory budget → inspect plan",
    "trap": "What if the supposedly small side suddenly grows?",
    "reply": "A forced broadcast can cause memory pressure or failure. I would keep statistics current, monitor size, and avoid hard-coded hints without an operating bound.",
    "label": "Technical answer",
    "hint": "Build your answer around: Small side → memory budget → inspect plan",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Apache Spark · Performance tuning",
      "url": "https://spark.apache.org/docs/latest/sql-performance-tuning"
    },
    "learn": {
      "plain": "A join combines rows from two datasets using a matching key. A broadcast join copies a small dataset to workers so they can match locally. A shuffle join redistributes data to bring matching keys together.",
      "example": "Join a billion sales rows to a tiny country-code table. Copying that lookup table to workers may be cheaper than moving the sales rows. A huge customer table may not fit safely on every worker.",
      "steps": [
        "Estimate actual memory size of the small side.",
        "Choose a strategy supported by the join type.",
        "Check the execution plan and memory behavior."
      ],
      "terms": [
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Data skew",
          "meaning": "Uneven data distribution that gives some tasks much more work than others."
        },
        {
          "term": "Shuffle",
          "meaning": "Moving data between tasks or machines so related rows can be processed together."
        },
        {
          "term": "Executor",
          "meaning": "A Spark process that runs tasks and holds data on a worker machine."
        },
        {
          "term": "Execution plan",
          "meaning": "The steps an engine intends to use to compute a query or job."
        },
        {
          "term": "Join",
          "meaning": "Combining rows from datasets using a matching condition, such as the same customer ID."
        },
        {
          "term": "Broadcast",
          "meaning": "Copying a sufficiently small dataset to workers so each can use it locally."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Semantic search",
          "meaning": "Search based on related meaning, usually through learned representations."
        }
      ]
    }
  },
  {
    "id": "round-2-47",
    "round": 2,
    "project": "data",
    "title": "Partitioning and small files",
    "q": "How would you partition a large transactional dataset?",
    "answer": "I would choose columns that match common filters and have manageable cardinality, then measure pruning and file sizes. Partitioning every unique customer can create too many tiny files. I would balance query access patterns, write volume, and maintenance, with compaction where appropriate. Physical partitioning should be a workload decision.",
    "cue": "Query filters → manageable cardinality → file sizes",
    "trap": "Is repartition the same as coalesce?",
    "reply": "Repartition generally shuffles to redistribute data and can increase or decrease partitions. Coalesce commonly reduces partitions with less movement, but may preserve imbalance.",
    "label": "Technical answer",
    "hint": "Build your answer around: Query filters → manageable cardinality → file sizes",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Apache Spark · Performance tuning",
      "url": "https://spark.apache.org/docs/latest/sql-performance-tuning"
    },
    "learn": {
      "plain": "Storage partitioning organizes files into groups so queries can skip irrelevant data. Too many small groups create overhead opening and managing files. Processing partitions are related but are a separate execution concept.",
      "example": "A sales query often selects a date. Files grouped by date let it skip other dates. A folder for every unique transaction would create too many tiny groups.",
      "steps": [
        "Choose grouping fields based on common queries.",
        "Check how many files and distinct groups result.",
        "Combine small files when appropriate and measure query performance."
      ],
      "terms": [
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Shuffle",
          "meaning": "Moving data between tasks or machines so related rows can be processed together."
        },
        {
          "term": "Cardinality",
          "meaning": "The number of distinct values, such as how many different customer IDs exist."
        },
        {
          "term": "Pruning",
          "meaning": "Skipping data groups that cannot contain the requested result."
        },
        {
          "term": "Compaction",
          "meaning": "Combining many small files into fewer larger files to reduce management and reading overhead."
        },
        {
          "term": "Repartition",
          "meaning": "Redistributing data into a chosen set of processing partitions, usually involving a shuffle."
        },
        {
          "term": "Coalesce",
          "meaning": "Combining partitions; often used to reduce their number with less redistribution, possibly preserving imbalance."
        },
        {
          "term": "Transaction",
          "meaning": "A group of database changes committed together under defined consistency guarantees."
        }
      ]
    }
  },
  {
    "id": "round-2-48",
    "round": 2,
    "project": "data",
    "title": "Watermarks and late data",
    "q": "What does a watermark do in a streaming pipeline?",
    "answer": "A watermark uses observed event-time progress and an allowed delay to bound state and handle late records for supported stateful operations. It is not a guarantee that every older record will be discarded at one exact instant. I would define the business policy for very late data and provide a correction or reconciliation path.",
    "cue": "Event time → bounded state → late-data policy",
    "trap": "Does a watermark advance just because wall-clock time passes?",
    "reply": "Generally it depends on event-time progress in the input. An idle or slow input can affect advancement, especially with multiple streams.",
    "label": "Technical answer",
    "hint": "Build your answer around: Event time → bounded state → late-data policy",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Apache Spark · Structured Streaming",
      "url": "https://spark.apache.org/docs/3.5.6/structured-streaming-programming-guide.html"
    },
    "learn": {
      "plain": "Event time is when something happened; processing time is when your system receives or handles it. A watermark tracks event-time progress and helps decide how long streaming operations retain state for late data.",
      "example": "A purchase happened at 10:00 but arrives at 10:08. A suitable lateness policy may still include it in the 10:00 window. Very late data may need a correction path.",
      "steps": [
        "Define the event timestamp.",
        "Choose an allowed delay based on the business.",
        "Understand the operation’s late-data rules and reconcile events beyond them."
      ],
      "terms": [
        {
          "term": "Watermark",
          "meaning": "An event-time progress threshold used by supported streaming operations to limit retained state and manage late data."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Window",
          "meaning": "A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-2-49",
    "round": 2,
    "project": "data",
    "title": "Exactly-once: scope the claim",
    "q": "Does a Spark checkpoint guarantee exactly-once writes to an external API?",
    "answer": "No. A checkpoint can support recovery of source progress and processing state, but external side effects depend on the sink’s commit and deduplication behavior. I would use a stable event or batch identity and an idempotent destination operation. The guarantee must cover the source, processing, and sink together.",
    "cue": "Checkpoint → sink semantics → idempotency",
    "trap": "What about foreachBatch?",
    "reply": "It can replay a batch after a failure. I would make the sink operation duplicate-safe using a stable batch identity and a durable commit protocol appropriate to that sink.",
    "label": "Technical answer",
    "hint": "Build your answer around: Checkpoint → sink semantics → idempotency",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "Apache Spark · Structured Streaming",
      "url": "https://spark.apache.org/docs/3.5.6/structured-streaming-programming-guide.html"
    },
    "learn": {
      "plain": "Exactly-once describes the final effect, not simply how many times code runs. A failed job may retry; the destination must avoid applying the same logical change twice.",
      "example": "A stream sends an email, crashes, and replays that event. A saved processing position alone does not undo or deduplicate the already sent email.",
      "steps": [
        "Know what the source and processing engine guarantee.",
        "Check the destination’s commit and duplicate handling.",
        "Use durable operation identities where retries can repeat effects."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "Sink",
          "meaning": "The destination receiving processed data, such as a table, file store, or API."
        },
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Protocol",
          "meaning": "Agreed rules for how systems exchange and interpret messages."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Side effect",
          "meaning": "A change outside a function's returned value, such as writing a file or sending a message."
        }
      ]
    }
  },
  {
    "id": "round-2-50",
    "round": 2,
    "project": "data",
    "title": "Incremental loads and schema changes",
    "q": "How would you design incremental ingestion that tolerates updates and schema drift?",
    "answer": "I would prefer a reliable change feed or monotonic source position, preserve operation type and source ordering, and make merges replay-safe. A timestamp watermark needs overlap and reconciliation if updates can arrive late. I would validate schema changes against a contract, allow compatible additions, and quarantine incompatible records with enough context to repair them.",
    "cue": "Change identity → replay-safe merge → schema contract",
    "trap": "Can you simply select rows newer than the last timestamp?",
    "reply": "Only if the source guarantees that ordering and completeness. Equal timestamps, late commits, updates and deletes can otherwise be missed.",
    "label": "Technical answer",
    "hint": "Build your answer around: Change identity → replay-safe merge → schema contract",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "An incremental load processes changes since the last run rather than rereading everything. A schema is the agreed structure of fields and types. New fields or changed types need an explicit policy.",
      "example": "Yesterday a record had amount=100; today it is corrected to 90. Loading only newly created rows would miss the update. A change feed can identify the correction.",
      "steps": [
        "Track a reliable source position or change identity.",
        "Apply inserts, updates, and deletes safely.",
        "Accept compatible schema changes and isolate incompatible records for repair."
      ],
      "terms": [
        {
          "term": "Watermark",
          "meaning": "An event-time progress threshold used by supported streaming operations to limit retained state and manage late data."
        },
        {
          "term": "Change feed",
          "meaning": "A sequence of source inserts, updates, or deletes that a downstream system can consume."
        },
        {
          "term": "Monotonic",
          "meaning": "Moving in only one direction; a monotonic clock avoids jumps caused by wall-clock corrections."
        },
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Quarantine",
          "meaning": "Keeping problematic records aside for investigation instead of letting them silently corrupt results."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Drift",
          "meaning": "A change in data, usage, sources, or outcomes after a system was developed."
        }
      ]
    }
  },
  {
    "id": "round-2-51",
    "round": 2,
    "project": "python",
    "title": "Async, threads, and processes",
    "q": "When would you use async def in a FastAPI endpoint?",
    "answer": "For request paths that await nonblocking I/O, such as an async HTTP or database client. Calling blocking work inside async def can block the event loop. I would isolate CPU-heavy processing or model inference in an appropriate worker or serving system and bound concurrency so requests cannot overwhelm downstream capacity.",
    "cue": "Await I/O → isolate blocking work → bound load",
    "trap": "Does making an inference function async make it faster?",
    "reply": "No. Declaring a function async does not parallelize its computation. Throughput depends on the execution backend, batching, scheduling, and resource limits.",
    "label": "Technical answer",
    "hint": "Build your answer around: Await I/O → isolate blocking work → bound load",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "source": {
      "title": "FastAPI · Concurrency",
      "url": "https://fastapi.tiangolo.com/async/"
    },
    "learn": {
      "plain": "Async lets a program do other work while waiting for supported input/output operations. It does not automatically make calculations parallel. Threads and processes offer different ways to run work concurrently.",
      "example": "While one request waits for a remote document, the service can start another request. A long CPU calculation inside the event loop can still block both.",
      "steps": [
        "Identify waiting work versus computation.",
        "Use nonblocking clients for async waiting.",
        "Move blocking work to suitable workers and limit how much runs at once."
      ],
      "terms": [
        {
          "term": "Throughput",
          "meaning": "How much work the system completes per unit of time."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Event loop",
          "meaning": "The scheduler that resumes asynchronous tasks when awaited operations are ready."
        },
        {
          "term": "Async",
          "meaning": "A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation."
        },
        {
          "term": "Nonblocking",
          "meaning": "Returning control while waiting so other work can proceed."
        },
        {
          "term": "I/O",
          "meaning": "Input/output: communication with files, networks, or other devices, often involving waiting."
        },
        {
          "term": "Thread",
          "meaning": "An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        }
      ]
    }
  },
  {
    "id": "round-2-52",
    "round": 2,
    "project": "python",
    "title": "Secure an extraction API",
    "q": "What controls belong around your model extraction endpoint?",
    "answer": "I would authenticate the caller, authorize access to the specific document, enforce size and format limits, and validate the output contract. Long jobs should use a durable job ID with status and idempotency. I would add request limits, deadlines, audit events, and careful log redaction so operational visibility does not expose document contents.",
    "cue": "Identity → resource authorization → bounded jobs",
    "trap": "Is a valid login enough to download any result?",
    "reply": "No. Each job and result needs object-level authorization; knowing a job ID must not grant access.",
    "label": "Technical answer",
    "hint": "Build your answer around: Identity → resource authorization → bounded jobs",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Authentication asks who you are. Authorization asks whether you may access this particular thing. Both are needed for an extraction service.",
      "example": "A logged-in employee guesses another employee’s document job ID. A valid login must not automatically allow reading that result.",
      "steps": [
        "Verify the caller.",
        "Check permission on the document and job.",
        "Limit input size, processing time, and sensitive logging."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Authentication",
          "meaning": "Checking who the caller is."
        },
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Redaction",
          "meaning": "Removing or masking sensitive information before storing or displaying it."
        }
      ]
    }
  },
  {
    "id": "round-2-53",
    "round": 2,
    "project": "python",
    "title": "Reliability tests that matter",
    "q": "What would you test beyond a successful extraction example?",
    "answer": "I would cover missing fields, ambiguous values, malformed files, duplicate requests, downstream timeouts, permission failures, and reprocessing. For model changes, I would use a frozen regression set with critical-field slices. For file operations, I would test state changes and crashes around side effects. Tests should target failure consequences, not merely mirror the code.",
    "cue": "Bad input → partial failure → regression",
    "trap": "Would you mock every external dependency?",
    "reply": "Unit tests can use mocks, but contract and integration tests must verify real boundaries. Otherwise a mocked success can hide a broken protocol or incompatible response.",
    "label": "Technical answer",
    "hint": "Build your answer around: Bad input → partial failure → regression",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Useful tests simulate mistakes that would hurt users. A test that only repeats the code’s logic may pass while missing the actual failure.",
      "example": "Send the same extraction request twice, remove a required field, or make the downstream service time out after saving. Check the intended outcome in each case.",
      "steps": [
        "Identify harmful failure outcomes.",
        "Create small repeatable cases.",
        "Check final results and recovery, not just that a function ran."
      ],
      "terms": [
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Protocol",
          "meaning": "Agreed rules for how systems exchange and interpret messages."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Side effect",
          "meaning": "A change outside a function's returned value, such as writing a file or sending a message."
        }
      ]
    }
  },
  {
    "id": "round-2-54",
    "round": 2,
    "project": "fundamentals",
    "title": "Deployment drift and rollback",
    "q": "How do you detect a model that degrades after deployment?",
    "answer": "I would monitor input changes, review and correction rates, and task-quality samples alongside latency and failures. Unlabeled drift is an alert, not proof of quality loss. I would version the model, prompt, schema, and evaluation set, roll out gradually, and retain a tested rollback path when measured quality or operational limits regress.",
    "cue": "Observe → label → controlled rollout",
    "trap": "Why not automatically retrain whenever drift rises?",
    "reply": "Drift may be harmless or caused by a pipeline bug. I would identify the cause, curate labels, and validate a candidate before changing production behavior.",
    "label": "Technical answer",
    "hint": "Build your answer around: Observe → label → controlled rollout",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "Deployment means putting a version into use. Drift means inputs or behavior change over time. Rollback restores a known working version when a release causes problems.",
      "example": "A new prompt handles examples well but sends many more live documents to review. Compare versions on the affected cases and restore the old version if needed.",
      "steps": [
        "Save model, prompt, and data-processing versions.",
        "Watch quality and operational measures.",
        "Test a safe way to restore the prior version."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Rollback",
          "meaning": "Returning to an earlier known-good version or undoing a supported transaction."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Gradual rollout",
          "meaning": "Introducing a change to a limited portion of traffic before broader release."
        },
        {
          "term": "Drift",
          "meaning": "A change in data, usage, sources, or outcomes after a system was developed."
        }
      ]
    }
  },
  {
    "id": "round-2-55",
    "round": 2,
    "project": "fundamentals",
    "title": "Measure the claim, not the headline",
    "q": "How would you report confidence in an accuracy estimate?",
    "answer": "I would state the population, metric definition, sample size, and uncertainty. For independent binary outcomes, a binomial interval is a useful starting point. Correlated templates or documents reduce effective independence, so I would consider grouping and stratified results. A narrow interval does not repair a test set that fails to represent real traffic.",
    "cue": "Define population → quantify uncertainty → check representativeness",
    "trap": "Does 1,080 synthetic cases make the benchmark representative?",
    "reply": "No. Sample size and representativeness are different. Repeated templates can produce precise estimates for a narrow distribution without supporting broad generalization.",
    "label": "Technical answer",
    "hint": "Build your answer around: Define population → quantify uncertainty → check representativeness",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 60,
    "learn": {
      "plain": "A measured percentage comes from a particular sample, with uncertainty. Repeated near-identical examples provide less evidence than many independent examples.",
      "example": "Getting 99 of 100 questions right is a sample result. It does not guarantee 99% on every future population, especially if all 100 share one template.",
      "steps": [
        "Define success and the population.",
        "Report sample size and uncertainty.",
        "Inspect whether the sample represents actual use."
      ],
      "terms": [
        {
          "term": "Generalization",
          "meaning": "Performance on new cases beyond those used for training or development."
        },
        {
          "term": "Uncertainty interval",
          "meaning": "A range calculated under statistical assumptions to describe uncertainty in an estimated quantity."
        },
        {
          "term": "Stratified results",
          "meaning": "Results separated into meaningful groups, such as languages or document types."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-3-56",
    "round": 3,
    "project": "coding",
    "title": "SQL: latest successful state",
    "q": "Table events(customer_id, event_id, event_time, ingested_at, status). Return customers whose latest event is successful. Assume non-null timestamps and a unique event_id; use event time, then ingestion time, then ID to break ties.",
    "answer": "I would rank every customer’s events before filtering on status. Otherwise I could return an old success even when the latest event failed. ROW_NUMBER gives one deterministic winner using the stated ordering. The final filter answers whether that winner is successful.",
    "cue": "Rank all → deterministic winner → filter status",
    "trap": "What if “latest” means the latest arrival instead?",
    "reply": "I would make ingested_at the primary ordering key. The business definition of latest determines the query.",
    "label": "Worked example",
    "hint": "Build your answer around: Rank all → deterministic winner → filter status",
    "evidence": "SQL reference tested with SQLite: newer failure suppresses older success, ties resolve by ingestion then ID. Null timestamp policy must be specified if the schema permits nulls.",
    "rubric": [
      "Ranked before filtering status",
      "Used deterministic tie-breakers",
      "Explained event time versus arrival time"
    ],
    "seconds": 300,
    "code": "WITH ranked AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY customer_id\n    ORDER BY event_time DESC, ingested_at DESC, event_id DESC\n  ) AS rn\n  FROM events\n)\nSELECT customer_id, event_id, event_time, status\nFROM ranked\nWHERE rn = 1 AND status = 'success';",
    "learn": {
      "plain": "The question is whether the most recent event succeeded. You must identify the latest event before checking its status. Filtering successes first changes the question.",
      "example": "Customer A has success at 9:00 and failure at 10:00. The correct result excludes A because the latest event failed.",
      "steps": [
        "Group events by customer with PARTITION BY.",
        "Number each group from newest to oldest using ROW_NUMBER.",
        "Keep row 1 only when its status is success."
      ],
      "terms": [
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "SQL",
          "meaning": "A language for querying and transforming relational data."
        },
        {
          "term": "ROW_NUMBER",
          "meaning": "A SQL window function assigning a position to each row within a defined ordered group."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        }
      ]
    }
  },
  {
    "id": "round-3-57",
    "round": 3,
    "project": "coding",
    "title": "SQL: a rolling seven-day total",
    "q": "Table daily_revenue(day DATE PRIMARY KEY, revenue NUMERIC) contains exactly one row per calendar day, including zero-revenue days. Compute the total for each day and the preceding six days.",
    "answer": "Because the input has one row for every calendar day, a seven-row window represents seven days. I would order by day and use six preceding rows plus the current row. If dates are missing, I would first join to a date spine or use a suitable date-range window for the database dialect.",
    "cue": "Dense calendar → ordered window → missing-day policy",
    "trap": "What happens at the beginning of the table?",
    "reply": "The total uses the available rows. If the requirement demands seven complete days, I would expose a window count and filter or label incomplete windows.",
    "label": "Worked example",
    "hint": "Build your answer around: Dense calendar → ordered window → missing-day policy",
    "evidence": "Reference tested on eight daily rows, including a zero-revenue day. ROWS is a row-count frame, not an elapsed-time frame.",
    "rubric": [
      "Stated the complete-calendar assumption",
      "Used the correct inclusive window",
      "Handled missing or incomplete days"
    ],
    "seconds": 300,
    "code": "SELECT day,\n       SUM(revenue) OVER (\n         ORDER BY day\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS revenue_7d,\n       COUNT(*) OVER (\n         ORDER BY day\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS days_in_window\nFROM daily_revenue\nORDER BY day;",
    "learn": {
      "plain": "A rolling total is recalculated for a moving window. A seven-row window equals seven days only when there is one row for every day.",
      "example": "With daily revenues 1,2,3,4,5,6,7, the day-seven total is 28. If day four is missing, seven rows may span eight calendar days.",
      "steps": [
        "Sort by day.",
        "Sum the current row and six earlier rows.",
        "Fill missing dates or use a date-aware window if the input has gaps."
      ],
      "terms": [
        {
          "term": "Join",
          "meaning": "Combining rows from datasets using a matching condition, such as the same customer ID."
        },
        {
          "term": "Window",
          "meaning": "A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies."
        },
        {
          "term": "Date spine",
          "meaning": "A complete sequence of dates used to fill missing days in a dataset."
        }
      ]
    }
  },
  {
    "id": "round-3-58",
    "round": 3,
    "project": "coding",
    "title": "SQL: stop a join from inflating money",
    "q": "Tables orders(order_id PRIMARY KEY, customer_id, amount) and order_items(item_id PRIMARY KEY, order_id). Return total order amount per customer for orders having at least one item.",
    "answer": "I would use EXISTS because I only need to know whether an item exists. A direct join creates one row per item and can multiply the order amount. The aggregation should preserve one row per qualifying order before summing by customer.",
    "cue": "Preserve grain → EXISTS → sum once",
    "trap": "Could SUM(DISTINCT amount) repair the join?",
    "reply": "No. Two different orders can have the same amount. Distinct amounts would incorrectly collapse legitimate orders.",
    "label": "Worked example",
    "hint": "Build your answer around: Preserve grain → EXISTS → sum once",
    "evidence": "Reference tested with multiple items per order, equal amounts on separate orders, and an order without items.",
    "rubric": [
      "Identified the one-order grain",
      "Avoided item-driven duplication",
      "Rejected SUM(DISTINCT amount) as a general fix"
    ],
    "seconds": 300,
    "code": "SELECT o.customer_id, SUM(o.amount) AS total_amount\nFROM orders AS o\nWHERE EXISTS (\n  SELECT 1 FROM order_items AS i\n  WHERE i.order_id = o.order_id\n)\nGROUP BY o.customer_id;",
    "learn": {
      "plain": "A one-to-many join can repeat a parent row. Adding the repeated parent amount then overcounts money. Use an existence check if you only need to know whether a child row exists.",
      "example": "An order worth $100 has three items. Joining orders to items creates three rows with $100 each. Summing those rows incorrectly produces $300.",
      "steps": [
        "Keep one row per order.",
        "Use EXISTS to check for at least one item.",
        "Sum each qualifying order once."
      ],
      "terms": [
        {
          "term": "Join",
          "meaning": "Combining rows from datasets using a matching condition, such as the same customer ID."
        },
        {
          "term": "Aggregation",
          "meaning": "Combining multiple records into a summary such as sum, count, or average."
        },
        {
          "term": "EXISTS",
          "meaning": "A SQL check for whether a subquery returns at least one matching row."
        }
      ]
    }
  },
  {
    "id": "round-3-59",
    "round": 3,
    "project": "coding",
    "title": "Python: stream the latest event",
    "q": "Given an iterable of dictionaries with customer_id, event_id, event_time and ingested_at, keep one latest event per customer. Timestamps are comparable timezone-normalized values; IDs are comparable unique integers. Return results ordered by customer ID.",
    "answer": "I would maintain one best event per customer and compare a tuple of event time, ingestion time, and event ID. This handles out-of-order input without sorting all events. Processing takes O(n), plus O(k log k) to order the k customers, and O(k) storage. I would validate timestamp and key types at the input boundary.",
    "cue": "One winner per key → tuple comparison → O(k) memory",
    "trap": "What if there are too many customers for memory?",
    "reply": "I would partition the data and use an external aggregation or database, rather than treating an in-memory dictionary as an unlimited solution.",
    "label": "Worked example",
    "hint": "Build your answer around: One winner per key → tuple comparison → O(k) memory",
    "evidence": "Reference tested with empty input, ties, out-of-order events, and multiple customers. Assumes all customer IDs can be sorted consistently.",
    "rubric": [
      "Handled out-of-order input and ties",
      "Gave correct time and space complexity",
      "Defined assumptions and an external-memory alternative"
    ],
    "seconds": 300,
    "code": "def latest_by_customer(events):\n    best = {}\n    def order(event):\n        return (event[\"event_time\"], event[\"ingested_at\"],\n                event[\"event_id\"])\n    for event in events:\n        key = event[\"customer_id\"]\n        if key not in best or order(event) > order(best[key]):\n            best[key] = dict(event)\n    return [best[key] for key in sorted(best)]",
    "learn": {
      "plain": "A dictionary can remember the latest event seen for each customer. Compare each arriving event with the saved one; input does not have to be sorted first.",
      "example": "For A, events arrive with times 9, 12, and 10. Save 9, replace it with 12, then keep 12 when 10 arrives.",
      "steps": [
        "Use customer ID as the dictionary key.",
        "Compare event time, arrival time, and ID in that order.",
        "Return saved winners, sorting customer keys only for output order."
      ],
      "terms": [
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Aggregation",
          "meaning": "Combining multiple records into a summary such as sum, count, or average."
        },
        {
          "term": "Dictionary",
          "meaning": "A Python mapping from keys to values, useful for fast lookup of a saved result."
        },
        {
          "term": "Tuple",
          "meaning": "An ordered Python group of values; comparison proceeds element by element."
        },
        {
          "term": "Big-O notation",
          "meaning": "Describes how work or memory grows with input size: linear O(n), sorting often O(n log n), constant O(1)."
        }
      ]
    }
  },
  {
    "id": "round-3-60",
    "round": 3,
    "project": "coding",
    "title": "Python: merge overlapping intervals",
    "q": "Given integer intervals [start, end], merge overlaps and touching endpoints. Reject intervals where start > end. Return sorted merged intervals.",
    "answer": "I would sort by start time, then maintain the last merged interval. If the next start is at or before the last end, I extend that interval; otherwise I append a new one. Sorting costs O(n log n), followed by a linear scan. I would clarify whether touching intervals count as overlapping before coding.",
    "cue": "Sort → compare last end → extend or append",
    "trap": "How would half-open interval semantics change it?",
    "reply": "If adjacent half-open intervals should remain separate, I would use a strict overlap comparison. The merge rule must match the domain’s boundary convention.",
    "label": "Worked example",
    "hint": "Build your answer around: Sort → compare last end → extend or append",
    "evidence": "Reference tested for empty input, nested intervals, touching endpoints, unsorted input and invalid bounds. Stores a sorted copy and does not mutate input pairs.",
    "rubric": [
      "Clarified endpoint semantics",
      "Handled nesting, empty input and invalid intervals",
      "Explained O(n log n) sorting cost"
    ],
    "seconds": 300,
    "code": "def merge_intervals(intervals):\n    ordered = sorted((start, end) for start, end in intervals)\n    if any(start > end for start, end in ordered):\n        raise ValueError(\"start must be <= end\")\n    merged = []\n    for start, end in ordered:\n        if merged and start <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], end)\n        else:\n            merged.append([start, end])\n    return merged",
    "learn": {
      "plain": "An interval has a start and an end. Overlapping intervals can be combined into one covering the same span. Sorting by start makes a single left-to-right pass possible.",
      "example": "[1,3] and [2,5] become [1,5]. [7,8] stays separate. In this solution, touching intervals such as [1,3] and [3,4] also merge.",
      "steps": [
        "Sort intervals by start.",
        "Compare the next interval with the most recent merged interval.",
        "Extend the end when they overlap; otherwise start a new interval."
      ],
      "terms": []
    }
  },
  {
    "id": "round-3-61",
    "round": 3,
    "project": "coding",
    "title": "Python: limit concurrent retrieval",
    "q": "Implement async retrieval for a finite list of document IDs using fetch(doc_id). Preserve input order, limit concurrent calls, and apply a per-call timeout. Assume fetch supports cooperative cancellation.",
    "answer": "I would use a semaphore to limit active fetches and apply the timeout only after acquiring a slot. I would return a per-document outcome so one failure does not discard successful results. This bounds active I/O, but scheduling every input still consumes memory; for very large inputs, I would use a bounded worker queue.",
    "cue": "Semaphore → timeout after slot → per-item outcome",
    "trap": "Does this guarantee a timed-out server request stopped?",
    "reply": "No. Cooperative cancellation stops the client wait only as supported by the coroutine. The remote operation may continue, so side effects still require idempotency.",
    "label": "Worked example",
    "hint": "Build your answer around: Semaphore → timeout after slot → per-item outcome",
    "evidence": "Python 3.11+ reference. Tested for ordering, maximum active calls, timeout, individual error, empty input and invalid limit. Overall cancellation is not swallowed; do not expose raw exception text to clients.",
    "rubric": [
      "Bounded active calls and preserved order",
      "Handled timeout and individual failure",
      "Explained task-memory and remote-cancellation limits"
    ],
    "seconds": 300,
    "code": "import asyncio\n\nasync def retrieve_many(ids, fetch, limit=4, timeout=5.0):\n    if limit < 1 or timeout <= 0:\n        raise ValueError(\"limit and timeout must be positive\")\n    slots = asyncio.Semaphore(limit)\n    async def one(doc_id):\n        async with slots:\n            try:\n                value = await asyncio.wait_for(fetch(doc_id), timeout)\n                return {\"id\": doc_id, \"value\": value, \"error\": None}\n            except TimeoutError:\n                return {\"id\": doc_id, \"value\": None, \"error\": \"timeout\"}\n            except Exception as exc:\n                return {\"id\": doc_id, \"value\": None,\n                        \"error\": type(exc).__name__}\n    return await asyncio.gather(*(one(doc_id) for doc_id in ids))",
    "source": {
      "title": "FastAPI · Concurrency",
      "url": "https://fastapi.tiangolo.com/async/"
    },
    "learn": {
      "plain": "A semaphore works like a limited number of entry passes. Each download needs a pass; when it finishes, another can begin. This protects a service from too many simultaneous requests.",
      "example": "With four passes and ten documents, at most four fetches are active. A failed fetch records its own error without throwing away successful results.",
      "steps": [
        "Acquire a pass.",
        "Fetch with a timeout and record success or failure.",
        "Release the pass even if fetching fails; use a bounded queue for enormous input lists."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Semaphore",
          "meaning": "A limited pool of permits used to restrict how many operations can be active at once."
        },
        {
          "term": "Async",
          "meaning": "A way to let other tasks progress while supported I/O is waiting; it does not automatically speed up computation."
        },
        {
          "term": "I/O",
          "meaning": "Input/output: communication with files, networks, or other devices, often involving waiting."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Side effect",
          "meaning": "A change outside a function's returned value, such as writing a file or sending a message."
        }
      ]
    }
  },
  {
    "id": "round-3-62",
    "round": 3,
    "project": "systems",
    "title": "Design: enterprise extraction",
    "q": "Design an extraction platform for 100,000 tax documents per day, with bursty arrivals, human review, auditability, and safe replay.",
    "answer": "I would clarify document sizes, peak arrival rate, latency targets, and critical-field error tolerance. Then I would separate durable ingestion, parsing, model extraction, validation, review, and idempotent delivery. Each result would retain source evidence and processing versions. I would monitor queue age, review rate, field errors, and cost, and size workers against peak demand and measured service time.",
    "cue": "Requirements → staged processing → recoverable delivery",
    "trap": "Give me a capacity estimate instead of listing components.",
    "reply": "100,000 per day averages about 1.16 documents per second. As a hypothetical example, a 10× peak and two seconds per document require about 24 concurrent processing slots at full utilization, before headroom. I would validate this against model batching and downstream limits.",
    "label": "Worked example",
    "hint": "Build your answer around: Requirements → staged processing → recoverable delivery",
    "evidence": "System-design scenario, not actual Bank of America scale. Example assumptions are explicitly hypothetical. Preserve approved human corrections across replay; model/prompt/schema versions belong in provenance.",
    "rubric": [
      "Clarified traffic, latency and critical fields",
      "Included review, versioning and idempotency",
      "Estimated capacity with explicit assumptions"
    ],
    "seconds": 180,
    "learn": {
      "plain": "An enterprise extraction system must keep working through bursts, errors, and review. Design the entire document journey, not only the model call.",
      "example": "A document is uploaded, saved, queued, read, extracted, checked, optionally reviewed, and delivered. Each stage records enough status to recover after interruption.",
      "steps": [
        "Clarify volumes and acceptable errors.",
        "Separate stages and keep durable input and status.",
        "Measure quality, waiting time, and cost across the whole workflow."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Provenance",
          "meaning": "The recorded origin and processing history of data or results."
        }
      ]
    }
  },
  {
    "id": "round-3-63",
    "round": 3,
    "project": "systems",
    "title": "Design: a multi-repository assistant",
    "q": "Design a codebase assistant for many repositories with frequent commits and different access permissions.",
    "answer": "I would index code with repository, revision, path, and symbol metadata, then enforce access scope before retrieval. Incremental indexing would update changed files and remove deleted content. A bounded workflow would retrieve evidence, resolve gaps, and answer with source references. I would evaluate answer quality by task type and monitor freshness, cost, and latency.",
    "cue": "Revision-aware index → access scope → bounded search",
    "trap": "What if an answer combines chunks from incompatible commits?",
    "reply": "I would query a consistent repository revision or clearly identify mixed-version evidence. Version metadata should control retrieval, not merely decorate citations.",
    "label": "Worked example",
    "hint": "Build your answer around: Revision-aware index → access scope → bounded search",
    "evidence": "Proposed architecture for a RAG design interview. Exact RAG project implementation remains unverified.",
    "rubric": [
      "Enforced per-repository authorization",
      "Handled updates, deletions and revision consistency",
      "Defined stopping conditions and evaluation"
    ],
    "seconds": 180,
    "learn": {
      "plain": "A multi-repository assistant searches several code collections. It must know which version each result came from and whether the user may read it.",
      "example": "An engineer has access to repository A but not B. Search must exclude B even if its code looks highly relevant. Deleted code should not remain available as current evidence.",
      "steps": [
        "Index code with source and permission information.",
        "Update changed files.",
        "Retrieve permitted current evidence and cite it in the answer."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "RAG",
          "meaning": "Retrieval-augmented generation: find relevant external content and supply it to a model to help answer."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Metadata",
          "meaning": "Descriptive information such as source path, date, owner, or document version."
        }
      ]
    }
  },
  {
    "id": "round-3-64",
    "round": 3,
    "project": "systems",
    "title": "Design: transactional lakehouse ingestion",
    "q": "Design ingestion for 5 TB per day with updates, deletes, duplicate deliveries, and downstream analytics.",
    "answer": "I would clarify source guarantees and freshness needs, land immutable raw changes with source positions, then validate and merge into curated tables using stable keys and ordering. Reprocessing must be deterministic, and deletes must propagate. I would partition for actual query patterns, manage file sizes, and monitor lag, quality, and reconciliation against the source.",
    "cue": "Raw changes → ordered merge → reconcile",
    "trap": "What if an older update arrives after a newer one?",
    "reply": "I would compare source versions or change positions and prevent an older event from replacing newer state. Ingestion time alone is not sufficient.",
    "label": "Worked example",
    "hint": "Build your answer around: Raw changes → ordered merge → reconcile",
    "evidence": "Hypothetical design related to the scale on your résumé. The résumé does not establish a particular lakehouse format, CDC vendor, or streaming topology.",
    "rubric": [
      "Included source ordering and delete semantics",
      "Made replay and merging duplicate-safe",
      "Addressed file layout, lag and reconciliation"
    ],
    "seconds": 180,
    "learn": {
      "plain": "A lakehouse stores large datasets in files while adding table-management features such as transactions. Ingestion brings source changes into those tables. Replay should reproduce the intended final state.",
      "example": "A customer record is created, updated, then deleted. The reporting table must apply those changes in the correct order, including deletion.",
      "steps": [
        "Keep an original record of incoming changes.",
        "Validate and apply them by stable keys and source order.",
        "Compare destination results with the source to detect missing changes."
      ],
      "terms": [
        {
          "term": "Partition",
          "meaning": "A piece of data processed separately; storage partitions also group files so queries can skip irrelevant data."
        },
        {
          "term": "Lakehouse",
          "meaning": "A data storage approach combining large file-based datasets with table-management capabilities such as transactions."
        },
        {
          "term": "Immutable",
          "meaning": "Kept unchanged after creation; later changes are represented separately."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Transaction",
          "meaning": "A group of database changes committed together under defined consistency guarantees."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        }
      ]
    }
  },
  {
    "id": "round-3-65",
    "round": 3,
    "project": "systems",
    "title": "Design: serve a fine-tuned model",
    "q": "How would you serve a fine-tuned extraction model under a strict latency and cost budget?",
    "answer": "I would profile preprocessing, prefill, decoding, and validation separately. I would benchmark model size and quantization on the actual extraction set, then tune batching and concurrency within memory limits. Requests need bounded queues and deadlines. I would track tail latency and cost per accepted document, including retries and human review, and roll out model changes gradually.",
    "cue": "Profile → benchmark → bounded serving",
    "trap": "Why not maximize batch size?",
    "reply": "Larger batches may improve throughput while increasing queueing and tail latency. I would optimize against the service-level objective and realistic arrival patterns.",
    "label": "Worked example",
    "hint": "Build your answer around: Profile → benchmark → bounded serving",
    "evidence": "Recommended design. No specific GPU, throughput or cost result is claimed for your past work.",
    "rubric": [
      "Separated latency components",
      "Balanced throughput, memory and tail latency",
      "Included rollout, overload and true cost"
    ],
    "seconds": 180,
    "learn": {
      "plain": "Serving is running a model to answer requests. Time is spent reading inputs, processing the prompt, generating tokens, and checking outputs. The slowest stage determines what to optimize.",
      "example": "If most time is spent waiting in a queue, shortening generated text may not solve the main delay. If GPU memory is full, more simultaneous requests may make things worse.",
      "steps": [
        "Measure each stage separately.",
        "Test batch size, concurrency, and model settings.",
        "Watch slow requests as well as averages and preserve quality."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Throughput",
          "meaning": "How much work the system completes per unit of time."
        },
        {
          "term": "Tail latency",
          "meaning": "The delay experienced by the slowest portion of requests, often summarized by a high percentile such as p95."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "Quantization",
          "meaning": "Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality."
        },
        {
          "term": "Batch",
          "meaning": "A group of examples or requests processed together."
        },
        {
          "term": "Prefill",
          "meaning": "Processing the input prompt before or as the model begins generating its response."
        },
        {
          "term": "Decoding",
          "meaning": "Producing output tokens from the model's predictions."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Benchmark",
          "meaning": "A defined collection of tasks and scoring rules used to compare performance."
        },
        {
          "term": "Gradual rollout",
          "meaning": "Introducing a change to a limited portion of traffic before broader release."
        }
      ]
    }
  },
  {
    "id": "round-3-66",
    "round": 3,
    "project": "systems",
    "title": "Design: safe desktop actions",
    "q": "Design an assistant that can move and rename files safely while users and other apps may change them.",
    "answer": "I would separate proposals from execution, bind approved arguments to observed state, and revalidate immediately before acting. Operations need stable identities, durable intent records, and verified outcomes. Recovery should inspect actual files rather than blindly replaying. Undo must detect changed content and destination collisions, with ambiguity routed to review.",
    "cue": "Bind permission → revalidate → reconcile",
    "trap": "Can you eliminate every race by hashing the source?",
    "reply": "No. A file can change after a hash check. I would use suitable operating-system primitives and narrow the race window, while documenting the remaining guarantees instead of promising global atomicity.",
    "label": "Worked example",
    "hint": "Build your answer around: Bind permission → revalidate → reconcile",
    "evidence": "A design exercise inspired by MFlash. Its supplied report confirms several controls but does not establish comprehensive external-process race protection.",
    "rubric": [
      "Separated permission from model confidence",
      "Handled crash windows and concurrent changes",
      "Protected newer state during undo"
    ],
    "seconds": 180,
    "learn": {
      "plain": "Safe desktop automation needs checks before and after a change. It must also know what to do if it crashes halfway through. Undo is only safe if it does not destroy newer work.",
      "example": "A move was approved yesterday, but the destination now contains a new file. Recovery must avoid overwriting it while trying to restore the old state.",
      "steps": [
        "Bind the action to the reviewed files and arguments.",
        "Record intent and verify the completed effect.",
        "Resolve uncertain state before retrying or undoing."
      ],
      "terms": [
        {
          "term": "Atomic",
          "meaning": "Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "Collision",
          "meaning": "Here, a destination name or path is already occupied by another file."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Window",
          "meaning": "A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-3-67",
    "round": 3,
    "project": "systems",
    "title": "Incident: latency and review rates spike",
    "q": "A model update improves an offline score, but production latency and human review rates double. What do you do?",
    "answer": "I would stop the rollout or revert to the known-good version while checking error severity and affected traffic. Then I would compare old and new versions on the same production-like samples, including parsing, prompt length, retries, and output behavior. I would treat the offline metric as incomplete and update the release gate to cover the regressions that mattered.",
    "cue": "Contain → isolate → strengthen release gate",
    "trap": "What if the model itself is fine and the new parser caused it?",
    "reply": "I would compare complete versioned pipelines and trace stage-level changes. A model rollback alone is not enough if the regression is in preprocessing.",
    "label": "Worked example",
    "hint": "Build your answer around: Contain → isolate → strengthen release gate",
    "evidence": "Hypothetical incident response. Do not present it as an outage you personally handled.",
    "rubric": [
      "Contained impact before extended diagnosis",
      "Compared versions and stage-level evidence",
      "Defined a regression test and rollout condition"
    ],
    "seconds": 180,
    "learn": {
      "plain": "An incident is a live problem affecting users. First reduce the damage, then investigate. A good offline score does not guarantee a release will work well on actual traffic.",
      "example": "A model update increases review work and response time. Restore the prior version, then compare the same failing documents across both versions.",
      "steps": [
        "Contain the impact.",
        "Identify which stage or change caused it.",
        "Add the missed failure case to release checks."
      ],
      "terms": [
        {
          "term": "Rollback",
          "meaning": "Returning to an earlier known-good version or undoing a supported transaction."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        }
      ]
    }
  },
  {
    "id": "round-4-68",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: defend your ownership",
    "q": "You say you owned the workflow end to end. Be specific: what did you personally deliver?",
    "answer": "At Bank of America, I work on the tax-document extraction workflow using Orchestra. My scope includes preparing extraction data, integrating document processing and APIs, building validation, and delivering the review UI. I also work with stakeholders on required fields and review needs. I would trace one document through those components and identify which parts I implemented. I would describe model training only to the extent supported by the actual Orchestra setup and run artifacts.",
    "cue": "Scope → components → one concrete trace",
    "trap": "What did Orchestra provide, and what did you implement?",
    "reply": "Orchestra is the bank’s internal tool used by the extraction workflow. I would distinguish the platform-provided capabilities from my data preparation, integrations, validation, and UI work. I would not identify an underlying model or claim a training method without confirming it.",
    "label": "Confirmed scope · pressure practice",
    "hint": "Build your answer around: Scope → components → one concrete trace",
    "evidence": "Updated to the user-confirmed Orchestra tool. Component ownership comes from earlier supplied context; underlying model and historical tuning method remain unconfirmed.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Interviewers use ownership questions to distinguish your contribution from the platform and team. Give a concrete trace of what you implemented.",
      "example": "Orchestra may provide extraction capability while you prepare data, validate outputs, connect APIs, and build the review screen. Explain the actual boundary.",
      "steps": [
        "State your scope.",
        "Walk through one example and your decisions.",
        "Verify training details before claiming a method."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        }
      ]
    }
  },
  {
    "id": "round-4-69",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: your benchmark has overlap",
    "q": "Your NoteEchoes templates overlap across train and test. Why should I trust your engineering judgment?",
    "answer": "That finding limits the generalization claim, and I would state it directly. The saved result still measures regression behavior on those synthetic cases, but it does not establish unfamiliar-request accuracy. The appropriate next step is an independently authored holdout and a matched base-model comparison. I would use those results to decide whether the model is ready for broader use.",
    "cue": "Acknowledge → scope evidence → improve test",
    "trap": "Did you know about the overlap when you wrote the résumé?",
    "reply": "The report surfaced the normalized-template finding. I would clarify when I learned it and describe the result with its scope rather than imply broader accuracy.",
    "label": "Report-backed reflection",
    "hint": "Build your answer around: Acknowledge → scope evidence → improve test",
    "evidence": "Do not invent a historical discovery timeline. If asked when you first knew, answer from your actual recollection.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "When a test resembles training too closely, the result still describes that test but supports a weaker claim about new inputs. Acknowledge the limit precisely.",
      "example": "A model succeeds on familiar templates. That can help detect regressions, but you need independent examples to assess unfamiliar requests.",
      "steps": [
        "Explain what the score still measures.",
        "State what it does not establish.",
        "Describe the independent evaluation you would run next."
      ],
      "terms": [
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Generalization",
          "meaning": "Performance on new cases beyond those used for training or development."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Synthetic data",
          "meaning": "Examples created artificially rather than directly observed from normal use."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-4-70",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: a real failure story",
    "q": "Tell me about a failure you personally handled. What changed because of your actions?",
    "answer": "I would use one real event and state the impact first. Then I would explain the evidence that isolated the cause, my specific corrective action, and how I verified recovery. I would close with the prevention step and its actual result. A credible answer distinguishes what I observed from what I inferred and avoids claiming a fix that was never deployed.",
    "cue": "Impact → your action → verified result",
    "trap": "Which failure from your projects can you honestly discuss?",
    "reply": "The NoteEchoes failed-ingestion retry finding is a concrete code-review issue, but it is not a confirmed incident you experienced or fixed. Use it as a design reflection unless you can supply the actual history.",
    "label": "Personal story needed · answer structure",
    "hint": "Build your answer around: Impact → your action → verified result",
    "evidence": "No historical incident was supplied. Replace this structure with your own event before using it as a past-tense interview answer. A generic invented STAR story would undermine follow-up answers.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A failure story should show how you noticed a problem, investigated it, repaired it, and reduced recurrence. Use a real event; the lesson is a structure rather than an invented incident.",
      "example": "Outline: users saw X → logs or data showed Y → I changed Z → verification showed recovery. Fill in only events and results that actually happened.",
      "steps": [
        "State impact and your role.",
        "Explain evidence and corrective action.",
        "Describe verification and prevention."
      ],
      "terms": [
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-4-71",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: disagree with a stakeholder",
    "q": "A client wants every extracted amount automatically approved. How would you respond?",
    "answer": "I would align on the business objective, then make the error consequences explicit. I would propose automation for cases that meet evidence-based acceptance criteria and review for ambiguous or high-impact cases. We could measure handling time, critical-field errors, and review volume in a pilot, then expand automation as the evidence supports it.",
    "cue": "Align → quantify risk → measurable pilot",
    "trap": "They say review defeats the purpose of automation.",
    "reply": "I would show total workflow effort and error cost, then target the review policy to the cases where it adds value. The goal is reliable throughput, not simply eliminating every review step.",
    "label": "Professional scenario answer",
    "hint": "Build your answer around: Align → quantify risk → measurable pilot",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A disagreement is easier to resolve when both sides agree on the outcome and can see the tradeoff. A pilot is a limited trial used to collect evidence.",
      "example": "A stakeholder wants every document automated. You propose automatic processing for well-supported cases and review for uncertain amounts, then measure both time saved and errors.",
      "steps": [
        "Agree on the business goal.",
        "Explain the consequences of mistakes.",
        "Use a measurable limited trial to decide how far to expand."
      ],
      "terms": [
        {
          "term": "Throughput",
          "meaning": "How much work the system completes per unit of time."
        },
        {
          "term": "Acceptance criteria",
          "meaning": "Concrete conditions used to decide whether delivered behavior meets the requirement."
        }
      ]
    }
  },
  {
    "id": "round-4-72",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: ship by Friday",
    "q": "You have two days to deliver extraction for ten document types. How do you prioritize?",
    "answer": "I would identify the highest-value document types and critical fields, agree on acceptance examples, and ship a narrow, observable workflow with a review fallback. I would make exclusions and failure behavior explicit and reserve time for integration and representative testing. A limited workflow with clear guarantees is easier to expand than a broad workflow whose failures are hidden.",
    "cue": "Critical scope → acceptance examples → safe rollout",
    "trap": "Would you skip evaluation to meet the date?",
    "reply": "I would reduce scope before removing the minimum checks needed to understand quality. A deadline changes the deliverable, not the need to know whether it works.",
    "label": "Professional scenario answer",
    "hint": "Build your answer around: Critical scope → acceptance examples → safe rollout",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A short deadline requires choosing a small useful scope with clear failure handling. Acceptance examples show what the delivered system must do correctly.",
      "example": "For Friday, support two known tax templates and send other formats to review. A later version can add more formats after testing. This is an example plan, not a past claim.",
      "steps": [
        "Choose the highest-value cases.",
        "Agree on success and exclusions.",
        "Leave time to test the complete workflow."
      ],
      "terms": [
        {
          "term": "Acceptance criteria",
          "meaning": "Concrete conditions used to decide whether delivered behavior meets the requirement."
        }
      ]
    }
  },
  {
    "id": "round-4-73",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: explain AI to a director",
    "q": "Explain why the extraction system still needs human review, without technical jargon.",
    "answer": "The system can do repetitive reading and field entry quickly, but unusual documents can still produce a plausible wrong value. Review focuses people on the cases where that mistake would matter. I would measure whether the combined process saves time while keeping the output dependable, and expand automatic handling as results justify it.",
    "cue": "Repetitive work → consequential exceptions → measured value",
    "trap": "Give me the single business metric you would lead with.",
    "reply": "Human handling time per accepted document, including corrections, paired with critical-field error rate. Speed without a quality measure can hide a worse outcome.",
    "label": "Professional scenario answer",
    "hint": "Build your answer around: Repetitive work → consequential exceptions → measured value",
    "evidence": "This is an interview explanation or proposed approach. It does not establish that you implemented it in a past role.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A nontechnical explanation should connect the system to work saved and errors avoided. Use the user’s process instead of listing model names.",
      "example": "“It reads documents and fills fields. Staff review unusual cases so plausible wrong values do not silently enter the next system.”",
      "steps": [
        "Describe the business task.",
        "Explain the remaining risk in everyday language.",
        "Say how success is measured."
      ],
      "terms": []
    }
  },
  {
    "id": "round-4-74",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: when you do not know",
    "q": "An interviewer asks which model and fine-tuning method Orchestra uses. How do you answer if those details are unconfirmed?",
    "answer": "Orchestra is the bank’s internal tool that we use for extracting fields from tax documents. I can explain the workflow, required fields, data preparation, validation, and integrations I worked on. I would verify the underlying model and actual training artifacts before quoting a model name or tuning recipe. As a design recommendation, I would evaluate supervised fine-tuning on verified document-to-field examples if the platform supports it.",
    "cue": "State limit → explain known work → reason forward",
    "trap": "Can you explain SFT without claiming you ran it?",
    "reply": "Yes. SFT learns from labeled input-output pairs. For this task the input is document content and the target is a verified structured field record. That is the approach I would evaluate; it is distinct from asserting which technique was used historically.",
    "label": "Professional interview response",
    "hint": "Build your answer around: State limit → explain known work → reason forward",
    "evidence": "Do not substitute recommended hyperparameters for a historical configuration. Concise acknowledgment is stronger than an invented number.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Knowing the workflow does not mean knowing every internal platform detail. A professional answer states what you know and what you would verify.",
      "example": "You know Orchestra extracts fields from tax documents. That does not establish whether its underlying model supports LoRA or which training run was used.",
      "steps": [
        "Explain confirmed responsibilities.",
        "Identify the specific unknown.",
        "Discuss a recommendation as a recommendation."
      ],
      "terms": [
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "SFT",
          "meaning": "Supervised fine-tuning: training on inputs paired with correct example outputs."
        },
        {
          "term": "LoRA",
          "meaning": "A method that trains small adapter matrices while keeping the base model weights fixed."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "round-4-75",
    "round": 4,
    "project": "behavior",
    "title": "Pressure: justify hiring you",
    "q": "Why should we hire you for an AI engineering role?",
    "answer": "I bring experience across the full path from data to a usable AI workflow. My background includes Spark pipelines, production document extraction, API and UI integration, and projects in local inference and controlled automation. I can discuss model quality and the surrounding system—how inputs are prepared, results are checked, and failures are handled. That is the combination I would bring to this role.",
    "cue": "Data foundation → AI delivery → operational judgment",
    "trap": "What do you still need to strengthen?",
    "reply": "I would strengthen independent model evaluation and deepen production measurements for my personal projects. I can identify the evidence gaps and describe a concrete plan to close them.",
    "label": "Résumé-backed positioning",
    "hint": "Build your answer around: Data foundation → AI delivery → operational judgment",
    "evidence": "Keep the opening aligned with the actual job. Avoid invented team leadership, revenue impact, or adoption metrics.",
    "rubric": [
      "Answered the actual question directly",
      "Explained the mechanism or tradeoff",
      "Handled the follow-up with a concrete check"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A hiring answer connects your evidence to the role’s needs. A small number of supported examples is stronger than a list of unverified skills.",
      "example": "For this role, connect data processing to reliable AI inputs, extraction work to usable outputs, and API integration to production delivery.",
      "steps": [
        "Name the relevant strengths.",
        "Support each with a real example.",
        "Explain how that combination helps the team."
      ],
      "terms": [
        {
          "term": "Spark",
          "meaning": "A processing engine that divides large data jobs into tasks that can run across multiple machines."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        }
      ]
    }
  },
  {
    "id": "friday-1",
    "round": 5,
    "project": "mcp",
    "title": "MCP: explain the whole path",
    "q": "Explain MCP and trace a flight-status question from the user to the airline API.",
    "answer": "MCP standardizes how an AI application discovers and uses external capabilities. The host manages clients connected to servers; servers can expose tools, resources, and prompts. In this example, the application chooses a flight-status tool, validates the request, invokes the server, and returns the API result to the model. The application controls orchestration and permissions.",
    "cue": "Host → client → server → API",
    "trap": "Is MCP the same as function calling?",
    "reply": "No. Function calling is a model-facing interaction pattern. MCP standardizes the integration interface; an application can expose discovered MCP tools through a model’s tool-calling interface.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Host → client → server → API",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "source": {
      "title": "MCP architecture",
      "url": "https://modelcontextprotocol.io/docs/learn/architecture"
    },
    "learn": {
      "plain": "MCP is a shared communication standard for connecting AI applications to tools and data. The host is the application; a client handles communication with a server; the server exposes capabilities.",
      "example": "A user asks for flight status. The application calls an available flight-status tool through its MCP connection; the server queries the airline service and returns a result.",
      "steps": [
        "Discover available capabilities.",
        "Choose and validate a specific tool request.",
        "Use the returned information to answer the user."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        },
        {
          "term": "Orchestration",
          "meaning": "Coordinating which steps or tools run, in what order, and with what data."
        },
        {
          "term": "Interface",
          "meaning": "A contract describing what operations a component supports without requiring callers to know its implementation."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        }
      ]
    }
  },
  {
    "id": "friday-2",
    "round": 5,
    "project": "mcp",
    "title": "MCP: tools, resources, prompts",
    "q": "How would you expose an airline system through MCP?",
    "answer": "I would expose get_flight_status as a tool, a policy document as a resource, and a reusable disruption-summary template as a prompt. Tools provide operations, resources provide contextual data, and prompts provide reusable message templates. I would keep each capability narrow and document its inputs, outputs, and failures.",
    "cue": "Operation → context → template",
    "trap": "Does a read-only tool need authorization?",
    "reply": "Yes. Reading a reservation or passenger record exposes private information. I would authorize access to the specific object at execution time.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Operation → context → template",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "An MCP tool performs an operation. A resource provides contextual content. A prompt supplies a reusable message template. These are different kinds of capability.",
      "example": "Flight-status lookup is a tool; a refund policy document can be a resource; a disruption-summary template can be a prompt.",
      "steps": [
        "Decide whether you need an operation, content, or instructions.",
        "Expose it through the appropriate capability.",
        "Document required inputs and access rules."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        }
      ]
    }
  },
  {
    "id": "friday-3",
    "round": 5,
    "project": "mcp",
    "title": "MCP: transports and compatibility",
    "q": "What changes between a local MCP server and a remote one?",
    "answer": "Local integrations commonly use stdio; remote integrations use Streamable HTTP. For a remote service I would plan identity, TLS, deadlines, request limits, and observability. I would pin the SDK and supported protocol versions and test capability discovery and errors with the target client rather than assume compatibility.",
    "cue": "Local vs remote → identity → contract tests",
    "trap": "Would you memorize one handshake for every deployment?",
    "reply": "No. Protocol versions evolve. I would explain capability discovery and verify the exact lifecycle against the SDK and specification version used by that deployment.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Local vs remote → identity → contract tests",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A transport is how messages travel. Stdio exchanges messages through local process input and output. Streamable HTTP communicates over HTTP, often with a remote service.",
      "example": "A desktop app can start a local helper process. A company-wide service instead needs a network endpoint, identity checks, and request limits.",
      "steps": [
        "Identify local versus remote deployment.",
        "Select a supported transport and protocol version.",
        "Test with the actual client and service setup."
      ],
      "terms": [
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        },
        {
          "term": "Stdio",
          "meaning": "Standard input/output streams used by local processes to exchange data."
        },
        {
          "term": "Streamable HTTP",
          "meaning": "An MCP transport that carries messages over HTTP and supports streaming where needed."
        },
        {
          "term": "TLS",
          "meaning": "The protocol commonly used to encrypt and authenticate network connections such as HTTPS."
        },
        {
          "term": "SDK",
          "meaning": "A software development kit: libraries and tools for building against a service or protocol."
        },
        {
          "term": "Protocol",
          "meaning": "Agreed rules for how systems exchange and interpret messages."
        },
        {
          "term": "Observability",
          "meaning": "The ability to understand system behavior through evidence such as metrics, logs, and traces."
        }
      ]
    }
  },
  {
    "id": "friday-4",
    "round": 5,
    "project": "mcp",
    "title": "MCP: secure a booking tool",
    "q": "Design the security boundary for an MCP tool that changes reservations.",
    "answer": "I would derive identity from a validated credential, enforce access to the reservation, validate the requested itinerary, and bind approval to the exact change and price. The server would recheck current state before committing. I would use least-privilege credentials and audit the decision without logging secrets or passenger details.",
    "cue": "Identity → object access → exact approval → recheck",
    "trap": "Can the server forward any incoming bearer token downstream?",
    "reply": "No. Tokens must be intended for their recipient. I would use the appropriate downstream authorization flow and validate token audience and scope.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Identity → object access → exact approval → recheck",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "source": {
      "title": "MCP security guidance",
      "url": "https://modelcontextprotocol.io/specification/latest/basic/security_best_practices"
    },
    "learn": {
      "plain": "A booking operation changes real state, so the system must verify both permission and the exact approved action. A token is a credential, not unrestricted permission.",
      "example": "The passenger approves Flight A for $200. The tool must not change that into Flight B for $350 or modify another passenger’s reservation.",
      "steps": [
        "Verify identity and reservation access.",
        "Bind approval to the itinerary and price.",
        "Check current state again immediately before committing."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Secret",
          "meaning": "A credential such as an API key or password that must be stored and accessed through approved controls."
        }
      ]
    }
  },
  {
    "id": "friday-5",
    "round": 5,
    "project": "mcp",
    "title": "MCP: timeout after a mutation",
    "q": "A booking tool times out. The model asks to retry. What happens?",
    "answer": "A timeout leaves the outcome uncertain. I would check the operation by its durable idempotency key or provider reference before issuing another mutation. The same key must represent the same request; a changed payload is a conflict. If the provider offers neither idempotency nor reliable status lookup, I would reconcile or escalate rather than promise duplicate-free retries.",
    "cue": "Unknown outcome → lookup → reconcile",
    "trap": "Does an in-memory set solve this?",
    "reply": "No. It loses state on restart and does not coordinate replicas. The durable operation record and downstream behavior must support the guarantee.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Unknown outcome → lookup → reconcile",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A failed response does not prove a booking failed. Repeating a state-changing request can create a second effect unless the service can recognize the original operation.",
      "example": "A seat is booked, but the network reply is lost. Looking up the original booking request avoids accidentally booking twice.",
      "steps": [
        "Keep the operation ID.",
        "Look up the outcome after a timeout.",
        "Retry only under a supported duplicate-safe procedure."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Mutation",
          "meaning": "An operation that changes stored state, such as updating a reservation."
        }
      ]
    }
  },
  {
    "id": "friday-6",
    "round": 5,
    "project": "mcp",
    "title": "MCP: test the server",
    "q": "What tests would you write for a new MCP server?",
    "answer": "I would test discovery and schemas, valid and malformed calls, authorization failures, result formats, and timeouts. I would add cross-user access attempts, replay of mutations, stale approvals, and downstream failures. A fake backend makes failure tests deterministic; a small integration suite verifies compatibility with the actual client and pinned SDK.",
    "cue": "Contract → access → failures → client",
    "trap": "A tool schema validates. Are you done?",
    "reply": "No. Schema validity says little about business correctness. A valid reservation ID can still belong to a different user, and a valid seat count can exceed inventory.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Contract → access → failures → client",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Testing a server means checking expected calls and mistakes: invalid inputs, unavailable services, and forbidden access. A fake backend simulates these conditions predictably.",
      "example": "One test returns flight status successfully. Another simulates an outage; another tries to read a reservation owned by somebody else.",
      "steps": [
        "Test the tool contract.",
        "Test permissions and failures.",
        "Check interoperability with the actual client."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "MCP",
          "meaning": "Model Context Protocol: a standard for exchanging tool and context capabilities between AI applications and servers."
        },
        {
          "term": "SDK",
          "meaning": "A software development kit: libraries and tools for building against a service or protocol."
        },
        {
          "term": "Mutation",
          "meaning": "An operation that changes stored state, such as updating a reservation."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        }
      ]
    }
  },
  {
    "id": "friday-7",
    "round": 5,
    "project": "agents",
    "title": "Agents: choose a workflow",
    "q": "When should you use an agent, a graph, or ordinary application code?",
    "answer": "I would use ordinary code for deterministic business rules and a bounded workflow when steps are known. An agent is useful when the next action depends on unstructured information. For this role I would favor explicit state transitions, typed tool results, time and cost limits, and an escalation path. I would add multiple agents only for a measured benefit.",
    "cue": "Task uncertainty → bounded state → measurable benefit",
    "trap": "Why not let the model loop until it succeeds?",
    "reply": "Repeated calls can accumulate cost and repeat harmful actions. I would stop on a terminal state, budget exhaustion, repeated failure, or an action needing human review.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Task uncertainty → bounded state → measurable benefit",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A fixed workflow follows known steps. An agent uses model decisions to choose some next steps. More freedom also means more possible mistakes and more need for limits.",
      "example": "Reading a PDF then validating four fields may fit a fixed pipeline. Investigating an unknown code problem may need a model to choose searches based on earlier results.",
      "steps": [
        "Use deterministic steps where the rules are clear.",
        "Allow model choice where it adds value.",
        "Limit time, calls, and possible side effects."
      ],
      "terms": [
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        },
        {
          "term": "Side effect",
          "meaning": "A change outside a function's returned value, such as writing a file or sending a message."
        }
      ]
    }
  },
  {
    "id": "friday-8",
    "round": 5,
    "project": "agents",
    "title": "Agents: checkpoint and approval",
    "q": "How would you resume an interrupted LangGraph workflow safely?",
    "answer": "I would persist graph state with a durable checkpointer and associate it with the correct thread and user. An approval records the exact proposed action and its version. On resumption I would revalidate that action against current state. External effects need idempotency because workflow recovery can replay work.",
    "cue": "Persist → bind approval → revalidate → idempotency",
    "trap": "Is an in-memory checkpointer production recovery?",
    "reply": "It can support a local demonstration but loses state on process restart. A production recovery requirement needs persistent storage and tested restart behavior.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Persist → bind approval → revalidate → idempotency",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "source": {
      "title": "LangGraph persistence",
      "url": "https://docs.langchain.com/oss/python/langgraph/persistence"
    },
    "learn": {
      "plain": "A checkpoint is a saved workflow state used to resume later. It is different from a guarantee that an external operation happened exactly once.",
      "example": "A workflow pauses before rebooking. When resumed tomorrow, it restores the proposed itinerary but still checks today’s availability and price.",
      "steps": [
        "Persist progress in durable storage.",
        "Remember the exact proposal the user approved.",
        "Revalidate and make repeated external calls safe."
      ],
      "terms": [
        {
          "term": "Checkpoint",
          "meaning": "Saved progress or state used to resume work; it does not by itself make external effects duplicate-safe."
        },
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Thread",
          "meaning": "An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "LangGraph",
          "meaning": "A framework for representing agent workflows as stateful steps and transitions, with persistence options."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "friday-9",
    "round": 5,
    "project": "agents",
    "title": "Frameworks: defend your choice",
    "q": "Compare LangGraph, Semantic Kernel, Copilot Studio, and direct tool calling.",
    "answer": "I would compare required control over state, deployment, integrations, testing, and team skills. Direct tool calling suits a small orchestration loop; a graph runtime suits explicit branching and recovery. For an existing Microsoft environment I would evaluate Semantic Kernel or Copilot Studio against the same requirements. I would demonstrate depth in the framework I have actually used and prototype missing capabilities before committing.",
    "cue": "Requirements → strongest known tool → validate gaps",
    "trap": "Have you used all of them in production?",
    "reply": "I would answer honestly. Familiarity with their purpose is different from implementation experience; I would connect the question to a framework I can explain from real work.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Requirements → strongest known tool → validate gaps",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A framework provides building blocks for common tasks. Choosing one depends on what control, integration, and deployment support the application needs.",
      "example": "A two-tool helper may need a short custom loop. A workflow that pauses for review and resumes after crashes may benefit from a framework with saved state.",
      "steps": [
        "List required capabilities.",
        "Compare options against those needs and team experience.",
        "Prototype uncertain capabilities before committing."
      ],
      "terms": [
        {
          "term": "Semantic search",
          "meaning": "Search based on related meaning, usually through learned representations."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "LangGraph",
          "meaning": "A framework for representing agent workflows as stateful steps and transitions, with persistence options."
        },
        {
          "term": "Semantic Kernel",
          "meaning": "A framework for integrating AI models, functions, and orchestration into applications."
        },
        {
          "term": "Copilot Studio",
          "meaning": "A Microsoft platform for building and connecting conversational agents and workflows."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Orchestration",
          "meaning": "Coordinating which steps or tools run, in what order, and with what data."
        }
      ]
    }
  },
  {
    "id": "friday-10",
    "round": 5,
    "project": "prompts",
    "title": "Prompt engineering: run an experiment",
    "q": "How do you improve a prompt systematically?",
    "answer": "I would define the task, output schema, allowed sources, and failure behavior, then build a representative evaluation set. I would add diverse few-shot examples for common ambiguities, compare one change at a time, and version prompts with model and retrieval settings. I would select using task quality, cost, latency, and important failure slices.",
    "cue": "Task contract → examples → controlled evaluation",
    "trap": "Should you always request detailed chain-of-thought?",
    "reply": "No. I would ask for the required answer and concise evidence or a verifiable explanation. For multi-step tasks I can structure intermediate outputs and checks without relying on hidden reasoning as an audit trail.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Task contract → examples → controlled evaluation",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Prompt engineering means improving the instructions and examples given to a model. Systematic improvement means measuring changes instead of judging one impressive output.",
      "example": "Add an example showing that a missing amount should become null rather than a guess. Compare the old and new instructions on many unseen documents.",
      "steps": [
        "Define the expected output.",
        "Change one important part of the prompt.",
        "Evaluate the change on representative cases."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Few-shot examples",
          "meaning": "A few demonstrations included in a prompt to show the desired behavior."
        }
      ]
    }
  },
  {
    "id": "friday-11",
    "round": 5,
    "project": "prompts",
    "title": "Structured output: valid but false",
    "q": "The model returns schema-valid JSON. How do you know it is correct?",
    "answer": "I would separately validate syntax, types, business invariants, and evidence. An extracted amount should have a source location and pass currency and reconciliation checks. Missing evidence should trigger an explicit missing value or review. I would measure field correctness on labeled data; schema validation alone cannot detect a plausible wrong amount.",
    "cue": "Schema → invariants → evidence → evaluation",
    "trap": "Will temperature zero eliminate hallucinations?",
    "reply": "No. It does not establish factual correctness or complete determinism across every serving setup. Retrieval, validation, and evaluation still matter.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Schema → invariants → evidence → evaluation",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A schema defines required fields and types. Passing a schema check proves the output is shaped correctly; it does not prove the values match the source.",
      "example": "amount=900 may be a valid number even if the correct amount is 90. Source evidence and business checks are still required.",
      "steps": [
        "Validate shape and types.",
        "Check relationships and source values.",
        "Route unsupported or conflicting values to review."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Reconciliation",
          "meaning": "Comparing records or system state to establish what actually happened and repair discrepancies."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "JSON",
          "meaning": "A structured text format using named fields, objects, and lists."
        },
        {
          "term": "Invariant",
          "meaning": "A rule that must remain true whenever a valid operation completes."
        }
      ]
    }
  },
  {
    "id": "friday-12",
    "round": 5,
    "project": "enterprise",
    "title": "DDD: model an airline domain",
    "q": "What does domain-driven design mean in this application?",
    "answer": "I would define bounded contexts such as reservations, flight operations, and customer communication. A reservation aggregate owns its invariants, such as allowed state transitions. Domain services express business rules; infrastructure adapters connect databases and airline APIs. The agent requests an operation through an application service rather than directly editing domain state.",
    "cue": "Bounded contexts → invariants → application service",
    "trap": "Is every database table a microservice?",
    "reply": "No. Service boundaries follow domain ownership and operational needs. Splitting tables into services can create distributed transactions without improving the design.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Bounded contexts → invariants → application service",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Domain-driven design organizes software around business concepts and rules. A bounded context is an area with a clear meaning and ownership. An aggregate groups related state whose rules must be maintained together.",
      "example": "Reservations handles booking status and passengers; flight operations handles whether a flight is delayed. Keeping their responsibilities clear avoids one giant component changing everything.",
      "steps": [
        "Identify business areas.",
        "Define the rules each area owns.",
        "Expose operations that enforce those rules."
      ],
      "terms": [
        {
          "term": "Aggregation",
          "meaning": "Combining multiple records into a summary such as sum, count, or average."
        },
        {
          "term": "Transaction",
          "meaning": "A group of database changes committed together under defined consistency guarantees."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Adapter",
          "meaning": "A small trainable addition used to adapt a model without updating all its base weights."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Bounded context / DDD",
          "meaning": "An approach organizing software around business concepts; a bounded context gives those concepts a clear local meaning and ownership."
        },
        {
          "term": "Invariant",
          "meaning": "A rule that must remain true whenever a valid operation completes."
        },
        {
          "term": "Domain aggregate",
          "meaning": "In DDD, a group of related objects whose consistency rules are controlled together. This differs from summarizing rows in data processing."
        }
      ]
    }
  },
  {
    "id": "friday-13",
    "round": 5,
    "project": "enterprise",
    "title": "OOP: make the model replaceable",
    "q": "How would you apply SOLID principles to an AI service?",
    "answer": "I would separate orchestration, retrieval, model access, and validation. Small interfaces let the application depend on capabilities rather than one vendor client. Dependency injection makes tests use deterministic fakes. I would avoid a large base class with unrelated responsibilities and prefer composition where behavior varies independently.",
    "cue": "Small interfaces → composition → test doubles",
    "trap": "How does this translate to Java?",
    "reply": "The same separation maps to interfaces and constructor injection. I would keep domain validation independent of the controller and provider SDK, then use unit and integration tests around those boundaries.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Small interfaces → composition → test doubles",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Object-oriented design groups related data and behavior. An interface defines what a component can do. Dependency injection supplies a component from outside instead of hard-coding it inside.",
      "example": "An extraction service calls a model interface. In production it receives the real provider; in a test it receives a fake that returns a known answer.",
      "steps": [
        "Separate responsibilities.",
        "Depend on a small stable interface.",
        "Swap implementations without rewriting the business logic."
      ],
      "terms": [
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "SDK",
          "meaning": "A software development kit: libraries and tools for building against a service or protocol."
        },
        {
          "term": "Orchestration",
          "meaning": "Coordinating which steps or tools run, in what order, and with what data."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        },
        {
          "term": "SOLID",
          "meaning": "Five object-oriented design principles encouraging focused responsibilities, replaceable implementations, and clear dependencies."
        },
        {
          "term": "Interface",
          "meaning": "A contract describing what operations a component supports without requiring callers to know its implementation."
        },
        {
          "term": "Dependency injection",
          "meaning": "Providing a component's dependencies from outside so implementations can be replaced or tested."
        },
        {
          "term": "Composition",
          "meaning": "Building behavior by combining components rather than relying only on inheritance."
        }
      ]
    }
  },
  {
    "id": "friday-14",
    "round": 5,
    "project": "enterprise",
    "title": "TDD: test an uncertain model",
    "q": "How do you use test-driven development with an LLM?",
    "answer": "I would first write failing deterministic tests for the application contract: input validation, access checks, tool routing, and failure handling. I would implement the smallest behavior and refactor. For model quality I would maintain a separate versioned evaluation suite with acceptance thresholds and representative slices. Unit tests use fake model responses; evaluations measure behavior on real model calls.",
    "cue": "Red → green → refactor; contract tests + evals",
    "trap": "Would you assert one exact natural-language paragraph?",
    "reply": "Usually no. I would test required facts, supported evidence, structured fields, and unacceptable behavior. Exact equality fits deterministic structured targets when the task requires it.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Red → green → refactor; contract tests + evals",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Test-driven development means writing an expected behavior as a failing test, implementing it, then improving the code without breaking that behavior. Model quality needs additional evaluation because generated text can vary.",
      "example": "A test says an unauthorized user cannot read job-123. A fake model makes this deterministic; a separate dataset measures actual extraction quality.",
      "steps": [
        "Write a behavior test.",
        "Implement and refactor.",
        "Run real-model evaluations for quality beyond deterministic rules."
      ],
      "terms": [
        {
          "term": "LLM",
          "meaning": "Large language model: a model trained to process and generate language, usually token by token."
        },
        {
          "term": "Validation",
          "meaning": "Checking that something meets requirements; in model development, a validation dataset also helps select settings."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        },
        {
          "term": "Refactor",
          "meaning": "Improve code structure while preserving its intended observable behavior."
        },
        {
          "term": "Acceptance criteria",
          "meaning": "Concrete conditions used to decide whether delivered behavior meets the requirement."
        }
      ]
    }
  },
  {
    "id": "friday-15",
    "round": 5,
    "project": "enterprise",
    "title": "REST: long-running AI jobs",
    "q": "Design a REST API for document extraction.",
    "answer": "I would accept an authorized request, validate file limits, and create a durable job using an idempotency key. A 202 response returns a job reference; status and result endpoints authorize access to that job. Workers process bounded jobs, persist outcomes, and support retries and cancellation. Errors distinguish invalid input, forbidden access, rate limits, and temporary failures.",
    "cue": "Validate → durable job → worker → authorized result",
    "trap": "Can two requests use the same key with different files?",
    "reply": "I would reject that conflict. The idempotency record should be scoped to the caller and bound to a canonical request fingerprint.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Validate → durable job → worker → authorized result",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A long-running job should not require the user’s connection to stay open until it finishes. The service can return a job ID, then let the user check progress.",
      "example": "Upload a document; receive job-42; later ask for job-42’s status and result. HTTP 202 means accepted for processing, not already completed.",
      "steps": [
        "Validate and save the job.",
        "Process it in a worker.",
        "Authorize every status and result request."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Durable / persistent",
          "meaning": "Stored so it survives the relevant process restart or failure, subject to the storage system's guarantees."
        },
        {
          "term": "Content fingerprint",
          "meaning": "A computed representation of content used to detect changes; hashing is not encryption."
        },
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "HTTP 202",
          "meaning": "A response status saying the request was accepted for processing, rather than confirming it has completed."
        },
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        }
      ]
    }
  },
  {
    "id": "friday-16",
    "round": 5,
    "project": "production",
    "title": "Cloud: deploy the service",
    "q": "Describe one concrete cloud deployment for this system.",
    "answer": "As a proposed Azure design, I would run the API and workers in managed containers, use a queue for long jobs, object storage for documents, a database for job state, and a managed identity and secret store for credentials. I would keep resource access private where required, scale workers to measured bottlenecks, and instrument the full request path. Equivalent AWS or GCP services can implement the same pattern.",
    "cue": "API → queue → workers → state → identity",
    "trap": "Is this what you deployed previously?",
    "reply": "Only if it matches my actual work. Otherwise I would label it as my design and explain the deployment environment I really used.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: API → queue → workers → state → identity",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Cloud deployment puts the application and its supporting services on managed infrastructure. Each component has a job: receive requests, store files, track state, or process work.",
      "example": "API receives a document → object storage holds the file → queue holds the job → worker extracts fields → database records status. This is a proposed design, not a claim about Orchestra’s hosting.",
      "steps": [
        "Choose components based on the workflow.",
        "Use approved identities and secret management.",
        "Measure load and scale the constrained component."
      ],
      "terms": [
        {
          "term": "API",
          "meaning": "A defined interface through which one piece of software requests work or data from another."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Worker",
          "meaning": "A process that takes a job and performs its processing steps."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        },
        {
          "term": "Managed identity",
          "meaning": "A platform-managed identity used by an application to access permitted services without embedding static credentials."
        },
        {
          "term": "Container",
          "meaning": "A packaged application and runtime dependencies run in an isolated process environment."
        },
        {
          "term": "Object storage",
          "meaning": "Storage for files or blobs addressed by identifiers, commonly used for documents and large assets."
        },
        {
          "term": "Secret",
          "meaning": "A credential such as an API key or password that must be stored and accessed through approved controls."
        }
      ]
    }
  },
  {
    "id": "friday-17",
    "round": 5,
    "project": "production",
    "title": "CI/CD: release an AI change",
    "q": "What belongs in the pipeline for changing a model or prompt?",
    "answer": "I would run unit and contract tests, dependency and secret checks, and a versioned evaluation suite. The release records the application, model, prompt, index, and configuration versions. I would deploy gradually with health and quality checks, compare against the baseline, and retain a tested rollback path. Schema and index changes need compatibility planning.",
    "cue": "Tests → eval gate → versions → gradual rollout",
    "trap": "Does rolling back the model restore everything?",
    "reply": "No. Prompt, retrieval, configuration, and data migrations may also have changed. I would treat the release as a versioned bundle and check compatibility before rollback.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Tests → eval gate → versions → gradual rollout",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "CI/CD automates checks and delivery of changes. An AI release can include model, prompt, code, and retrieval changes; all need traceable versions.",
      "example": "A prompt edit accidentally increases missing fields. A fixed evaluation set can catch the regression before the change reaches everyone.",
      "steps": [
        "Run code tests and model evaluations.",
        "Record the complete release configuration.",
        "Release gradually and retain a tested recovery path."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Rollback",
          "meaning": "Returning to an earlier known-good version or undoing a supported transaction."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Regression",
          "meaning": "A previously working behavior becoming worse; a regression test checks against that failure."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "CI/CD",
          "meaning": "Automated integration checks and delivery or deployment workflows for software changes."
        },
        {
          "term": "Gradual rollout",
          "meaning": "Introducing a change to a limited portion of traffic before broader release."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        },
        {
          "term": "Secret",
          "meaning": "A credential such as an API key or password that must be stored and accessed through approved controls."
        }
      ]
    }
  },
  {
    "id": "friday-18",
    "round": 5,
    "project": "production",
    "title": "Observability: diagnose a regression",
    "q": "Answer quality fell and latency doubled. How do you investigate?",
    "answer": "I would segment by release, tenant, language, document type, and tool path, then inspect redacted traces. I would separate queue time, retrieval, reranking, model time, and tool latency. I would compare retrieval recall, schema failures, unsupported claims, token use, and retry counts with the baseline. The first mitigation could be rollback, reduced load, or disabling a failing path.",
    "cue": "Segment → trace stages → compare → mitigate",
    "trap": "Can you just log every prompt and response?",
    "reply": "That can expose sensitive data. I would use controlled sampling, redaction, access restrictions, and retention rules while preserving identifiers and metrics needed for diagnosis.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Segment → trace stages → compare → mitigate",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Observability means collecting enough information to understand what the system is doing. Metrics summarize behavior; a trace follows one request through stages.",
      "example": "A request takes 12 seconds: 8 waiting, 1 searching, and 3 generating. The trace points to waiting time as the main problem.",
      "steps": [
        "Split the request into measurable stages.",
        "Compare affected groups and versions.",
        "Investigate the slow or inaccurate stage and verify the fix."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Rollback",
          "meaning": "Returning to an earlier known-good version or undoing a supported transaction."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Tenant",
          "meaning": "A customer or organization whose data must be separated from others in a shared service."
        },
        {
          "term": "Redaction",
          "meaning": "Removing or masking sensitive information before storing or displaying it."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Reranking",
          "meaning": "Reordering an already retrieved candidate set using another relevance scorer."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        },
        {
          "term": "Observability",
          "meaning": "The ability to understand system behavior through evidence such as metrics, logs, and traces."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        },
        {
          "term": "Retention",
          "meaning": "How long data is kept before deletion or archival under a defined policy."
        }
      ]
    }
  },
  {
    "id": "friday-19",
    "round": 5,
    "project": "production",
    "title": "Cost: estimate before optimizing",
    "q": "Estimate monthly inference cost and choose an optimization.",
    "answer": "I would multiply monthly calls by average input and output tokens and the applicable token rates, then add retrieval, hosting, and tool costs. For a hypothetical 100,000 calls with 2,000 input and 400 output tokens, at fictional rates of $1 and $4 per million tokens, inference is $360. I would first measure wasted context and repeated work, then compare routing, caching, or shorter outputs against quality.",
    "cue": "Volume × tokens × rates → measure waste",
    "trap": "Does caching always reduce cost safely?",
    "reply": "No. The key needs the relevant user access scope and model, prompt, and content versions. Sensitive or rapidly changing answers may be unsuitable for caching.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Volume × tokens × rates → measure waste",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Usage cost depends on how many calls are made and how much each call processes. Input and output tokens may have different rates. Other infrastructure adds cost too.",
      "example": "Using fictional prices: 100,000 calls × 2,000 input tokens = 200 million input tokens. At $1 per million that is $200. Forty million output tokens at $4 per million add $160. Total: $360 before other costs.",
      "steps": [
        "Estimate volume and tokens.",
        "Apply the relevant rates separately.",
        "Measure waste and evaluate savings without losing quality."
      ],
      "terms": [
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        }
      ]
    }
  },
  {
    "id": "friday-20",
    "round": 5,
    "project": "production",
    "title": "Governance: turn policy into controls",
    "q": "What would responsible AI governance look like here?",
    "answer": "I would classify use-case risk and data sensitivity, assign owners, define acceptable behavior, and document model and data provenance. Controls include restricted data access, retention, evaluations of harmful or unequal outcomes, human review for consequential actions, and an incident process. Release gates and audit records make the policy enforceable in daily engineering.",
    "cue": "Risk → owner → control → evidence",
    "trap": "Can a responsible-AI document alone prevent harm?",
    "reply": "No. I would connect each requirement to an implemented control, a test, an owner, and a response when the control fails.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Risk → owner → control → evidence",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Governance turns expectations about acceptable AI use into responsibilities, controls, and evidence. It is a practical way to decide who can use what and when humans must review.",
      "example": "A tax extractor may need approved data access, a retention limit, a review rule for uncertain amounts, and an owner who responds to incidents.",
      "steps": [
        "Identify risks and owners.",
        "Implement controls in the workflow.",
        "Keep evidence that the controls were tested and used."
      ],
      "terms": [
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Provenance",
          "meaning": "The recorded origin and processing history of data or results."
        },
        {
          "term": "Retention",
          "meaning": "How long data is kept before deletion or archival under a defined policy."
        }
      ]
    }
  },
  {
    "id": "friday-21",
    "round": 5,
    "project": "production",
    "title": "Evaluation: calibrate the judge",
    "q": "How do you make LLM-as-a-judge useful for release decisions?",
    "answer": "I would define a specific rubric, calibrate it on human-labeled cases, and measure agreement and failure patterns. I would blind system identities and randomize answer order where relevant. The judge should score dimensions such as correctness and evidence support separately, with deterministic checks for fields and policy rules. I would keep model and judge versions recorded.",
    "cue": "Rubric → human calibration → failure slices",
    "trap": "The judge prefers longer answers. What changes?",
    "reply": "I would inspect length bias, refine the rubric, compare paired examples, and validate again against human judgments. A convenient score is not automatically a valid measure of task success.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Rubric → human calibration → failure slices",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "An LLM judge is a model used to score another output. It can be useful but can also make mistakes or prefer superficial features such as length. Calibration checks it against trusted human examples.",
      "example": "Two answers have the same facts, but one is longer. If the judge always prefers the long answer despite errors, its scoring rule needs correction.",
      "steps": [
        "Define a clear rubric.",
        "Compare judge scores with reviewed examples.",
        "Track disagreement and important failure types."
      ],
      "terms": [
        {
          "term": "LLM",
          "meaning": "Large language model: a model trained to process and generate language, usually token by token."
        },
        {
          "term": "Calibration",
          "meaning": "Checking how scores or judgments correspond to reliable observed outcomes or trusted labels."
        },
        {
          "term": "Rubric",
          "meaning": "Explicit criteria used to judge an answer or result."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        }
      ]
    }
  },
  {
    "id": "friday-22",
    "round": 5,
    "project": "production",
    "title": "A/B testing: measure business value",
    "q": "How would you evaluate a new AI assistant online?",
    "answer": "I would choose a primary outcome such as successfully resolved cases and guardrails such as incorrect actions, complaints, latency, and cost. I would randomize at a unit that reduces contamination, often user or account, estimate sample needs, and predefine the analysis period. I would report uncertainty and segment results; a before-and-after comparison alone can confuse product effects with traffic changes.",
    "cue": "Outcome → guardrails → randomize → uncertainty",
    "trap": "What if clicks rise but resolution falls?",
    "reply": "The primary outcome and guardrails decide the result. More clicks can indicate friction rather than value; I would investigate before expanding rollout.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Outcome → guardrails → randomize → uncertainty",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A/B testing compares two versions on randomly assigned groups. A primary metric measures the desired outcome; guardrails check that improvement does not create unacceptable harm elsewhere.",
      "example": "Half the eligible users receive version A, half B. Measure resolved cases, but also watch incorrect actions, time, and cost. More clicks alone may mean more confusion.",
      "steps": [
        "Choose outcome and guardrails before starting.",
        "Randomize at an appropriate level.",
        "Analyze sufficient data with uncertainty and relevant groups."
      ],
      "terms": [
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "A/B test",
          "meaning": "A controlled comparison of versions using randomly assigned groups when appropriate."
        },
        {
          "term": "Guardrail metric",
          "meaning": "A measure that checks whether an improvement causes unacceptable harm in another dimension."
        }
      ]
    }
  },
  {
    "id": "friday-23",
    "round": 5,
    "project": "production",
    "title": "Drift: identify what changed",
    "q": "What does drift mean for an LLM application?",
    "answer": "I would distinguish changes in user inputs, source knowledge, retrieved results, and output quality. I would monitor representative data slices and regularly label recent cases. A changed embedding distribution is a signal to investigate, not proof of business failure. The response may be reindexing, prompt changes, updated evaluations, or a different model depending on the cause.",
    "cue": "Input → knowledge → retrieval → outcome",
    "trap": "How do you know without ground truth?",
    "reply": "Operational proxies can flag issues, but they do not establish correctness. I would maintain a sampled human-review process and delay-dependent outcome labels where available.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Input → knowledge → retrieval → outcome",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Drift means something about real use changes after development. New document layouts, languages, or policies can make yesterday’s model less effective.",
      "example": "Training mainly used clean typed forms. Live traffic now includes many blurry scans. The input changed; the solution might be better document processing rather than retraining alone.",
      "steps": [
        "Monitor recent inputs and outcomes.",
        "Review samples to locate the cause.",
        "Update the relevant component and evaluate again."
      ],
      "terms": [
        {
          "term": "LLM",
          "meaning": "Large language model: a model trained to process and generate language, usually token by token."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Drift",
          "meaning": "A change in data, usage, sources, or outcomes after a system was developed."
        }
      ]
    }
  },
  {
    "id": "friday-24",
    "round": 5,
    "project": "enterprise",
    "title": "Delivery: clarify and estimate",
    "q": "A leader asks for an AI assistant in two weeks. What do you do?",
    "answer": "I would identify users, workflow, data access, success criteria, and the consequences of a wrong answer. I would scope a thin end-to-end slice with explicit acceptance tests, list dependencies and uncertainties, and estimate a range after a short technical spike. In Agile delivery I would demonstrate working increments, collect feedback, and update risks and priorities with the product owner.",
    "cue": "Requirements → acceptance → spike → increments",
    "trap": "What would you put in the project specification?",
    "reply": "Scope, inputs and outputs, domain rules, interfaces, security and reliability targets, evaluation criteria, dependencies, milestones, and assumptions. A traceable backlog and simple project spreadsheet can make ownership and progress clear.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Requirements → acceptance → spike → increments",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Requirements explain what users need; acceptance criteria define how you know it works. An estimate depends on scope, dependencies, and uncertainty. A technical spike is a short investigation of an unknown.",
      "example": "Before promising a two-week extractor, check document access, supported formats, required fields, and review needs. A short experiment can reveal whether scans are readable.",
      "steps": [
        "Clarify the useful outcome.",
        "Test major unknowns.",
        "Deliver a small complete slice and refine the plan with feedback."
      ],
      "terms": [
        {
          "term": "Interface",
          "meaning": "A contract describing what operations a component supports without requiring callers to know its implementation."
        },
        {
          "term": "Trace",
          "meaning": "A record following a request through processing stages to show where work and failures occur."
        },
        {
          "term": "Technical spike",
          "meaning": "A short investigation or prototype used to reduce uncertainty before committing to an implementation plan."
        },
        {
          "term": "Agile delivery",
          "meaning": "Working in small increments with feedback and adjusting priorities as requirements become clearer."
        },
        {
          "term": "Acceptance criteria",
          "meaning": "Concrete conditions used to decide whether delivered behavior meets the requirement."
        }
      ]
    }
  },
  {
    "id": "friday-25",
    "round": 5,
    "project": "systems",
    "title": "Airline design: disrupted travel assistant",
    "q": "Design an assistant that helps a passenger after a cancelled flight.",
    "answer": "I would clarify whether the assistant only explains options or can rebook. Policy answers use versioned retrieval; flight status and available seats come from live tools. A bounded workflow authenticates the passenger, reads the reservation, retrieves eligible options, obtains approval for the exact itinerary and price, and commits through the reservation service with idempotency. I would recheck availability before commit, notify only after confirmation, and provide an agent handoff when state is uncertain.",
    "cue": "Clarify → live tools + policy RAG → approval → safe commit",
    "trap": "Inventory changes after the user approves. What happens?",
    "reply": "I would stop that attempt, fetch current options, and request approval for the new offer. I would not silently substitute another flight or price.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Clarify → live tools + policy RAG → approval → safe commit",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "An airline assistant needs current operational facts and written policies. Policies can be retrieved from documents, but available seats and booking status require live services.",
      "example": "A policy permits rebooking, but the proposed seat sells out before approval. The system must fetch a new option and obtain approval for that changed offer.",
      "steps": [
        "Verify the passenger and reservation.",
        "Combine live options with applicable policy.",
        "Approve an exact offer, recheck it, commit safely, and confirm the result."
      ],
      "terms": [
        {
          "term": "Idempotency",
          "meaning": "Repeating the same logical request has the same intended final effect as applying it once, under the service's actual guarantees."
        },
        {
          "term": "Authentication",
          "meaning": "Checking who the caller is."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "friday-26",
    "round": 5,
    "project": "fundamentals",
    "title": "Transformers: explain without hand-waving",
    "q": "Explain a decoder transformer and the difference between training and inference.",
    "answer": "Tokens become embeddings with position information. Causal self-attention combines information from earlier tokens, and feed-forward layers transform those representations using residual connections and normalization. Training adjusts weights using a loss such as next-token prediction; inference applies learned weights to generate tokens. Context is temporary input, while fine-tuning changes parameters.",
    "cue": "Tokens → attention → layers → next-token distribution",
    "trap": "Does attention mean the model understands or remembers everything?",
    "reply": "No. Attention is a computation over representations. Limited context, learned associations, and generation errors mean I still need external evidence and task-specific evaluation.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Tokens → attention → layers → next-token distribution",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A transformer is a neural-network architecture that processes token representations using attention and other layers. A decoder model predicts the next token using earlier context. Training changes its learned numbers; inference uses them.",
      "example": "Given “The total is”, the model predicts a next token based on learned patterns and supplied context. Its ability to produce plausible text does not guarantee it copied the correct amount.",
      "steps": [
        "Convert text to tokens and numerical representations.",
        "Combine context through attention and other layers.",
        "Predict successive tokens and validate task outputs."
      ],
      "terms": [
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Embedding",
          "meaning": "A list of numbers representing content so a system can compare items, often for similarity in meaning."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Attention",
          "meaning": "A computation that combines information from token representations using learned relevance weights."
        },
        {
          "term": "Causal attention",
          "meaning": "Attention restricted so a position cannot use later tokens when predicting the next token."
        },
        {
          "term": "Residual connection",
          "meaning": "A shortcut that adds an earlier representation to a later layer's output."
        },
        {
          "term": "Normalization",
          "meaning": "Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules."
        },
        {
          "term": "Inference",
          "meaning": "Using a trained model to produce predictions or outputs."
        }
      ]
    }
  },
  {
    "id": "friday-27",
    "round": 5,
    "project": "coding",
    "title": "Python: sliding-window rate limiter",
    "q": "Implement allow(user) for at most N requests per rolling W seconds. Explain boundaries, concurrency, and scaling.",
    "answer": "I would keep a deque of accepted timestamps per user, remove expired entries, and accept only below the limit. A monotonic clock avoids wall-clock jumps, and a lock protects the check-and-append operation within one process. Each timestamp is appended and removed once, giving amortized O(1) work per request. Production needs idle-key cleanup and a shared atomic implementation across replicas.",
    "cue": "Deque → expire → atomic check → append",
    "trap": "Can this enforce a global limit across four workers?",
    "reply": "No. Their memory is separate. I would move the atomic decision to a shared store and explicitly define behavior when that store is unavailable.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Deque → expire → atomic check → append",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 300,
    "code": "from collections import deque\nfrom threading import Lock\nfrom time import monotonic\n\nclass SlidingWindowLimiter:\n    \"\"\"Single-process limiter. Window is (now-window, now].\"\"\"\n    def __init__(self, limit, window, clock=monotonic):\n        if limit <= 0 or window <= 0:\n            raise ValueError(\"limit and window must be positive\")\n        self.limit, self.window, self.clock = limit, window, clock\n        self.events = {}\n        self.lock = Lock()\n\n    def allow(self, user):\n        with self.lock:\n            now = self.clock()\n            queue = self.events.setdefault(user, deque())\n            while queue and queue[0] <= now - self.window:\n                queue.popleft()\n            if len(queue) >= self.limit:\n                return False\n            queue.append(now)\n            return True\n",
    "learn": {
      "plain": "A rate limiter restricts how many requests a user can make during a time window. A deque is a queue that efficiently removes old entries from the front.",
      "example": "Limit: two requests per ten seconds. Requests at 0 and 1 are accepted; at 2 the next is refused. At 10, the request at 0 expires under this solution’s boundary rule, so another can enter.",
      "steps": [
        "Remove timestamps outside the window.",
        "Check the number remaining while holding a lock.",
        "If there is room, record and accept the new request."
      ],
      "terms": [
        {
          "term": "Monotonic",
          "meaning": "Moving in only one direction; a monotonic clock avoids jumps caused by wall-clock corrections."
        },
        {
          "term": "Atomic",
          "meaning": "Performed as an indivisible operation, so other work cannot observe or exploit a halfway-completed step."
        },
        {
          "term": "Concurrency",
          "meaning": "Multiple operations making progress during overlapping periods; this does not always mean simultaneous CPU execution."
        },
        {
          "term": "Thread",
          "meaning": "An execution path within a process; in an agent framework, a thread ID can instead mean a persisted conversation/workflow scope."
        },
        {
          "term": "REST API",
          "meaning": "An API style built around resources and standard HTTP operations; concrete endpoints still need explicit contracts."
        },
        {
          "term": "Queue",
          "meaning": "A waiting list of work to be processed, often used to absorb bursts."
        },
        {
          "term": "Window",
          "meaning": "A defined set of neighboring rows or time-bounded events used for a calculation; context determines which meaning applies."
        },
        {
          "term": "Deque",
          "meaning": "A double-ended queue with efficient additions and removals at either end."
        },
        {
          "term": "Amortized cost",
          "meaning": "Average work per operation across a sequence, allowing some individual operations to do more work."
        },
        {
          "term": "O(1)",
          "meaning": "Work bounded independently of input size under the stated assumptions; not a promise of a fixed number of milliseconds."
        }
      ]
    }
  },
  {
    "id": "friday-28",
    "round": 5,
    "project": "coding",
    "title": "Python: combine search results",
    "q": "Merge ranked lexical and vector search results using reciprocal rank fusion. Handle duplicates and deterministic ties.",
    "answer": "I would accumulate 1 divided by k plus rank for each document across lists. A per-list set prevents a repeated document from gaining extra votes in that list. I would sort by descending fused score and then document ID for deterministic ties. With M total entries and U unique documents, work is O(M + U log U), and space is O(U). All candidate lists must already respect authorization.",
    "cue": "Ranks → per-list dedup → score → deterministic order",
    "trap": "Does fusion make lexical and vector scores comparable?",
    "reply": "It avoids comparing their raw score scales by using ranks. The rank constant and retrieval depth still need evaluation on representative queries.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Ranks → per-list dedup → score → deterministic order",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 300,
    "code": "def reciprocal_rank_fusion(rankings, k=60):\n    \"\"\"Ranked document-ID lists; equal scores break by document ID.\"\"\"\n    if k <= 0:\n        raise ValueError(\"k must be positive\")\n    scores = {}\n    for ranking in rankings:\n        seen = set()\n        for rank, doc_id in enumerate(ranking, start=1):\n            if doc_id in seen:\n                continue\n            seen.add(doc_id)\n            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)\n    return sorted(scores, key=lambda doc_id: (-scores[doc_id], doc_id))\n",
    "learn": {
      "plain": "Reciprocal rank fusion combines search result orderings without comparing their raw score scales. Higher-ranked documents receive larger votes. Repeated appearances across lists add votes.",
      "example": "With k=60, rank 1 contributes 1/61 and rank 2 contributes 1/62. A document highly ranked by both searches can outrank one found by only a single search.",
      "steps": [
        "Give each document a vote based on rank.",
        "Ignore repeats within the same result list.",
        "Add votes across lists and sort by total, using a stable tie-break."
      ],
      "terms": [
        {
          "term": "Authorization",
          "meaning": "Checking whether that caller is allowed to perform the particular operation on the particular data."
        },
        {
          "term": "Vector",
          "meaning": "An ordered list of numbers; embeddings are vectors used to represent content."
        },
        {
          "term": "Retrieval",
          "meaning": "Searching for and returning relevant source material."
        },
        {
          "term": "Lexical search",
          "meaning": "Search based on words or exact text matches."
        },
        {
          "term": "Reciprocal rank fusion",
          "meaning": "Combining result rankings by adding a rank-based vote, commonly 1/(k+rank), for each document."
        },
        {
          "term": "Rank",
          "meaning": "In LoRA, the size of the low-rank update space; in search, an item's position in an ordered list."
        },
        {
          "term": "Big-O notation",
          "meaning": "Describes how work or memory grows with input size: linear O(n), sorting often O(n log n), constant O(1)."
        },
        {
          "term": "Deterministic",
          "meaning": "Producing the same result for the same relevant inputs and conditions."
        }
      ]
    }
  },
  {
    "id": "friday-29",
    "round": 5,
    "project": "coding",
    "title": "Python: evaluate extraction outputs",
    "q": "Compute field accuracy and whole-document exact match. Distinguish a missing key from an explicit null; report extra documents.",
    "answer": "I would define comparison rules before coding. This implementation checks exact string-or-null equality across required fields and penalizes extra fields in whole-document exact match. A sentinel separates a missing prediction from an explicit null. It reports unexpected documents separately and returns undefined rates as None for empty denominators. Runtime is linear in the fields and document IDs inspected.",
    "cue": "Metric contract → sentinel → denominators → extras",
    "trap": "Should currency strings be normalized first?",
    "reply": "Only under an agreed business rule. I would parse currency and units explicitly, preserve the original evidence, and test whether normalization can incorrectly equate different amounts.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Metric contract → sentinel → denominators → extras",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 300,
    "code": "def extraction_metrics(expected, predicted):\n    \"\"\"Mappings: document ID -> {field: string or None}.\n    Equality is exact; required fields are the keys in expected.\n    Missing predictions do not match an explicit None.\n    \"\"\"\n    missing = object()\n    total = correct = exact = 0\n    for doc_id, truth in expected.items():\n        guess = predicted.get(doc_id, {})\n        matches = [guess.get(field, missing) == value\n                   for field, value in truth.items()]\n        total += len(matches)\n        correct += sum(matches)\n        exact += (doc_id in predicted and all(matches)\n                  and set(guess) == set(truth))\n    return {\n        \"field_accuracy\": correct / total if total else None,\n        \"document_exact_match\": exact / len(expected) if expected else None,\n        \"unexpected_documents\": len(set(predicted) - set(expected)),\n    }\n",
    "learn": {
      "plain": "An evaluator compares predictions with correct answers. Field accuracy counts individual correct fields; document exact match requires the whole expected record to match under the chosen rules.",
      "example": "Expected vendor=A and amount=100; predicted vendor=A and amount=90. Field accuracy is 1/2=50%, but document exact match is 0. Missing a field differs from explicitly returning null.",
      "steps": [
        "Define comparison and missing-value rules.",
        "Count correct fields and complete records.",
        "Handle empty inputs and unexpected output explicitly."
      ],
      "terms": [
        {
          "term": "Normalization",
          "meaning": "Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules."
        },
        {
          "term": "Sentinel",
          "meaning": "A unique marker representing a special condition such as a missing key, distinct from a real value like None."
        }
      ]
    }
  },
  {
    "id": "friday-30",
    "round": 5,
    "project": "behavior",
    "title": "Pressure: give your 90-second project story",
    "q": "Explain your most relevant AI project in 90 seconds, then defend two decisions.",
    "answer": "I would structure my real example as: business problem and users; my exact ownership; data and model flow; one difficult engineering decision; evaluation and deployment; one limitation and next improvement. For the tax-extraction work using Orchestra, the bank’s internal tool, I can discuss digital PDFs and spreadsheets and extracting workflow IDs, dates, vendor, and amount. I must fill in only training settings, deployment facts, and outcomes I can substantiate.",
    "cue": "Problem → ownership → architecture → evidence → limitation",
    "trap": "What was the baseline behind the claimed savings?",
    "reply": "I would name the baseline workflow, sample, measurement period, and calculation. If the percentage was an estimate rather than a controlled result, I would say so and explain what evidence I do have.",
    "label": "Friday interview · recommended approach",
    "hint": "Structure your answer: Problem → ownership → architecture → evidence → limitation",
    "evidence": "Role-specific practice based on the supplied job description. This is a proposed design or explanation, not a claim about your past experience.",
    "rubric": [
      "Answered directly and explained the mechanism",
      "Named a concrete failure case and a test",
      "Defended the tradeoff without inventing experience"
    ],
    "seconds": 90,
    "learn": {
      "plain": "A project story links the business problem, your contribution, a design decision, and evidence of results. It should be understandable before you discuss individual tools.",
      "example": "For Orchestra: explain tax documents → required fields → extraction and checks → downstream use. Then add one real decision and its verified outcome.",
      "steps": [
        "Explain who needed what.",
        "Describe your actual implementation and decision.",
        "Use measured evidence where available and state limitations."
      ],
      "terms": [
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "State",
          "meaning": "The information representing a workflow or object's current condition and progress."
        }
      ]
    }
  },
  {
    "id": "orchestra-data",
    "title": "Prepare tax-document training examples",
    "q": "What would the training data for Orchestra-supported extraction look like?",
    "answer": "Each example would contain a tax document’s content, a consistent extraction instruction and schema, and the correct structured fields verified by a reviewer. For example, a document stating “Vendor: Example Co; Amount: 125.00 USD” could map to {\"vendor\": \"Example Co\", \"amount\": \"125.00\", \"currency\": \"USD\"}. I would include missing fields, repeated entities, multiple dates, tables, poor scans, and corrected mistakes. Absent evidence maps to an explicit missing value. All data preparation and training would stay in the bank-approved environment.",
    "cue": "Document + schema → verified fields → difficult cases",
    "trap": "Would you create a separate training example for every tax value?",
    "reply": "The goal is to learn extraction behavior, not memorize particular documents. Examples should cover varied structures and field relationships; evaluation must test new documents and templates.",
    "round": 1,
    "project": "bofa",
    "label": "Recommended approach · Orchestra support required",
    "hint": "Learn this sequence: Document + schema → verified fields → difficult cases",
    "evidence": "Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.",
    "rubric": [
      "Explains the mechanism clearly",
      "Names an assumption or limit",
      "Connects the answer to tax-field extraction"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Training data is a collection of example inputs and correct outputs. For extraction, the correct answer must come from the document and follow the intended field definitions.",
      "example": "If “amount” means total tax due, do not label some documents with subtotal and others with balance paid. Inconsistent labels teach inconsistent behavior.",
      "steps": [
        "Write field definitions.",
        "Have reviewers verify examples and missing values.",
        "Include varied layouts and difficult cases within approved data handling."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "id": "orchestra-eval",
    "title": "Evaluate a tax-extraction fine-tune",
    "q": "How would you decide whether fine-tuning improves the Orchestra workflow?",
    "answer": "I would compare direct parsing, a prompted baseline, and the tuned candidate on the same held-out documents. I would split by document family or template and check duplicates to reduce leakage. Metrics include per-field exact match with agreed normalization, precision and recall for present fields, missing-field handling, whole-record correctness, vendor-amount association, schema validity, and review effort. I would report failures by document type and choose a candidate only if it improves the required quality without unacceptable latency or cost.",
    "cue": "Independent holdout → baseline comparison → field and workflow quality",
    "trap": "Training loss drops. Is that sufficient?",
    "reply": "No. Lower token loss can reflect better formatting while important fields remain wrong. Selection needs held-out extraction and workflow metrics, with extra attention to high-impact errors such as incorrect amounts.",
    "round": 1,
    "project": "bofa",
    "label": "Recommended approach · Orchestra support required",
    "hint": "Learn this sequence: Independent holdout → baseline comparison → field and workflow quality",
    "evidence": "Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.",
    "rubric": [
      "Explains the mechanism clearly",
      "Names an assumption or limit",
      "Connects the answer to tax-field extraction"
    ],
    "seconds": 90,
    "learn": {
      "plain": "Evaluation checks whether the adapted model extracts the right fields on documents it did not train on. A fair comparison uses the same test set for each approach.",
      "example": "A model gets vendor names right but associates amounts with the wrong vendors. Overall formatting success would miss the critical problem.",
      "steps": [
        "Keep independent test documents.",
        "Compare parsing, prompted extraction, and any tuned candidate.",
        "Report field accuracy, relationships, review effort, and operational cost."
      ],
      "terms": [
        {
          "term": "Schema",
          "meaning": "The agreed structure of data, including field names, types, and constraints."
        },
        {
          "term": "Latency",
          "meaning": "How long one request takes to receive its result."
        },
        {
          "term": "Token",
          "meaning": "A unit processed by a language model, such as a word, part of a word, or punctuation. In authentication, a token instead means a credential."
        },
        {
          "term": "Fine-tuning",
          "meaning": "Additional training that changes some or all learned model parameters for a task or domain."
        },
        {
          "term": "Loss",
          "meaning": "A numerical training-error measure minimized during learning; it may differ from the business success metric."
        },
        {
          "term": "Attention",
          "meaning": "A computation that combines information from token representations using learned relevance weights."
        },
        {
          "term": "Normalization",
          "meaning": "Rescaling numerical representations in a model; in data evaluation it can instead mean standardizing formats under agreed rules."
        },
        {
          "term": "Data leakage",
          "meaning": "Information improperly crossing from training or model selection into evaluation, making results misleading."
        },
        {
          "term": "Held-out data",
          "meaning": "Examples excluded from the relevant training process so they can assess performance on unseen cases."
        },
        {
          "term": "Baseline",
          "meaning": "A reference approach or earlier version used for comparison."
        },
        {
          "term": "Precision",
          "meaning": "Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented."
        },
        {
          "term": "Recall",
          "meaning": "Among the relevant items, the fraction the system finds or identifies."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        }
      ]
    }
  },
  {
    "id": "orchestra-choice",
    "title": "SFT, LoRA, QLoRA: what changes?",
    "q": "How do SFT, LoRA, and QLoRA relate, and would you use DPO or continued pretraining?",
    "answer": "SFT is training on correct example responses. LoRA changes a model through small adapter matrices while freezing the base weights. QLoRA combines adapter training with a quantized frozen base to reduce memory used by base weights. You can therefore perform SFT using LoRA or QLoRA; they are not competing task objectives. For field extraction, labeled correct outputs are a direct starting point. Preference optimization such as DPO targets preference comparisons, while continued pretraining learns from domain text; neither replaces task-specific extraction examples or evaluation.",
    "cue": "Objective: SFT → parameters: LoRA → memory: QLoRA",
    "trap": "Is QLoRA automatically best for every bank system?",
    "reply": "No. Model compatibility, bank policy, hardware, precision requirements, managed platform support, and measured extraction quality determine the choice. I would not assume Orchestra exposes adapter training.",
    "round": 1,
    "project": "bofa",
    "label": "Recommended approach · Orchestra support required",
    "hint": "Learn this sequence: Objective: SFT → parameters: LoRA → memory: QLoRA",
    "evidence": "Conceptual preparation for the Orchestra tax-extraction task. This does not identify Orchestra’s internal model or establish historical training work.",
    "rubric": [
      "Explains the mechanism clearly",
      "Names an assumption or limit",
      "Connects the answer to tax-field extraction"
    ],
    "seconds": 90,
    "learn": {
      "plain": "These terms describe different choices. SFT defines learning from correct examples. LoRA defines a small parameter-update method. QLoRA adds a quantized base model to reduce memory for those weights.",
      "example": "You can do SFT using LoRA: teach document-to-field examples while changing only adapters. This is like choosing both the lesson and the method of writing notes; they answer different questions.",
      "steps": [
        "Choose the learning task.",
        "Check which training methods the platform supports.",
        "Select memory and precision options using measured quality."
      ],
      "terms": [
        {
          "term": "SFT",
          "meaning": "Supervised fine-tuning: training on inputs paired with correct example outputs."
        },
        {
          "term": "LoRA",
          "meaning": "A method that trains small adapter matrices while keeping the base model weights fixed."
        },
        {
          "term": "QLoRA",
          "meaning": "Adapter training using a quantized frozen base model to reduce the memory used by its weights."
        },
        {
          "term": "Quantization",
          "meaning": "Representing numerical values with a more compact set of values, often using fewer bits and potentially affecting quality."
        },
        {
          "term": "Model parameters / weights",
          "meaning": "Learned numbers that determine how a model transforms its inputs."
        },
        {
          "term": "Adapter",
          "meaning": "A small trainable addition used to adapt a model without updating all its base weights."
        },
        {
          "term": "Precision",
          "meaning": "Among predicted positives, the fraction that are correct; numerical precision instead refers to how numbers are represented."
        },
        {
          "term": "Orchestra",
          "meaning": "The user-confirmed internal bank tool used for tax-document field extraction; its underlying model and tuning interface are unconfirmed."
        },
        {
          "term": "DPO",
          "meaning": "Direct Preference Optimization: training from preferred versus less-preferred response pairs; it is different from simply supplying one correct target output."
        },
        {
          "term": "Pretraining",
          "meaning": "Initial broad training of a model; continued pretraining adds further domain-text training before or alongside task adaptation."
        }
      ]
    }
  }
];
const repoPrompt="# Collect project evidence for my interview dashboard\n\nOpen a Codex chat in the relevant project folder and paste the prompt below. Run it once for NoteEchoes, once for Agentic RAG Codebase Assistant, and once for MFlash. Bring each resulting report back to my interview-preparation chat.\n\n## Copy this prompt\n\nInspect this repository in read-only mode and prepare an evidence-based technical interview briefing. Follow repository instructions. Do not edit source, install dependencies, run training, invoke paid services, or expose secrets, personal data, private document content, or credentials. Existing tests may be run only if safe and lightweight; label anything not run as unverified.\n\nFirst identify which project this is. Separate all findings into: verified in code, documented but not verified, reasonable inference, and unknown. Do not invent metrics, infrastructure, production usage, design intent, or my personal ownership. Cite repository-relative files and line numbers for important claims. Distinguish implemented code from dead code, experiments, TODOs, and documentation promises.\n\nReturn a Markdown report in your reply with:\n1. A plain-English project summary and user problem.\n2. The architecture and an end-to-end trace of one request, including inputs, transformations, storage, model/tool calls, and outputs.\n3. Exact models, versions, dependencies, execution locations, and deployment evidence. Separate model training from inference; distinguish local and remote processing.\n4. Data preparation: sources, cleaning, labels, splits, leakage controls, dataset size, and privacy handling. Mark missing evidence explicitly.\n5. Training configuration if present: model size, quantization, LoRA/QLoRA settings, target modules, rank, alpha, dropout, learning rate, batch size, epochs, hardware, loss and checkpoint choice. Report actual evidence only.\n6. Retrieval if present: parsing, chunking, embedding, indexing, filters, ranking, reranking, citations, updating/deleting stale data, and access controls.\n7. Evaluation: metric definitions, denominators, test-set origin, baseline comparisons, actual results, failure slices, and whether reported numbers can be reproduced. Do not treat schema validity as semantic accuracy.\n8. Reliability: retries, idempotency, persistence, cancellation, recovery, authorization, logging, and failure behavior.\n9. Three concrete failure scenarios grounded in code, and what the implementation does for each. Do not invent historical incidents.\n10. Main engineering tradeoffs. Separate documented choices from recommendations you would make now.\n11. Ten difficult interviewer questions with concise answers grounded in the repository. Label recommendations as hypothetical; do not present them as features I built.\n12. A 60\u201390 second project explanation containing only substantiated facts, plus five questions I must answer about personal ownership, actual usage, and undocumented decisions.\n13. A compact fact table: claim | evidence | confidence | remaining question.\n\nProject-specific focus:\n- NoteEchoes: Qwen3 model/runtime location; QLoRA training; what \u201c96.3% action-field exact match\u201d means; the 1,080 synthetic evaluation cases; train/test isolation; multilingual behavior; OCR; knowledge graph; SQLite persistence and recovery; TestFlight evidence; local-first versus remote operations.\n- Agentic RAG Codebase Assistant: actual LangGraph states/edges and agent roles; Claude calls; Pinecone indexing; asynchronous retrieval; stopping conditions and maximum retries for self-correcting search; Ragas configuration and real evaluation results; security and stale code handling.\n- MFlash: 74 action templates; classifier versus MPNet dual encoder responsibilities; contrastive objective and hard-negative construction; observation-bound arguments; typed adapters; authorization; cancellation; SHA-256 checks; journaling; idempotent retries; stale-state rejection; collision-safe undo; crash windows between filesystem and database writes.\n\nKeep the report useful for an interview, not a file-by-file inventory. Finish with the most important unknowns. If the repository is missing training or evaluation artifacts, say so rather than guessing.\n";