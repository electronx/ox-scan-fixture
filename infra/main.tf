# INTENTIONALLY INSECURE TEST FIXTURE — never apply.
resource "aws_security_group" "wide_open" {
  name = "wide-open"
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_s3_bucket_acl" "public" {
  bucket = "example-fixture-bucket"
  acl    = "public-read"
}
