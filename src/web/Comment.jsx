// INTENTIONALLY INSECURE TEST FIXTURE — never run.
export function Comment({ body }) {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
