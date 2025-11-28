import { z, ZodError } from "zod";

export class ValidationError extends Error {
  public readonly issues: ZodError["issues"];
  public readonly context?: string;

  constructor(message: string, issues: ZodError["issues"], context?: string) {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
    this.context = context;
  }
}

export function formatZodIssues(issues: ZodError["issues"], context?: string): string {
  const prefix = context ? `${context}: ` : "";
  const lines = issues.map((issue) => {
    const path = issue.path?.length ? String(issue.path.join(".")) : "<root>";
    return `${path} — ${issue.message}`;
  });
  return `${prefix}${lines.join("; ")}`;
}

export function parseOrThrow<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  context?: string
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = formatZodIssues(result.error.issues, context);
    console.error(message, result.error.issues);
    throw new ValidationError(message, result.error.issues, context);
  }
  return result.data;
}


