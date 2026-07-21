# AWS Provider Configuration
provider "aws" {
  region = "af-south-1" # Hosted in Africa/Nigeria region for NITDA data residency compliance
}

# Main VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "akoka-solve-vpc"
    Environment = "Production"
    Compliance = "NITDA" # Ensure data resides securely within local bounds
  }
}

# Public Subnet (e.g., for NAT Gateway / Load Balancers)
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "af-south-1a"

  tags = {
    Name = "akoka-solve-public-subnet"
  }
}

# Private Subnet 1 (App Tier)
resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "af-south-1a"

  tags = {
    Name = "akoka-solve-private-app"
  }
}

# Private Subnet 2 (Data Tier - highly restricted)
resource "aws_subnet" "private_db" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "af-south-1b"

  tags = {
    Name = "akoka-solve-private-db"
  }
}

# Security Group for API Gateway
resource "aws_security_group" "api_sg" {
  name        = "api-gateway-sg"
  description = "Security group for API Gateway"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from Load Balancer"
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["10.0.1.0/24"] # Only allow traffic from public subnet
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
