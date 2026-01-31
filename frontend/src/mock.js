// Real data from Nitin Sarvesh Raajagopal's Resume

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Nitin Sarvesh Raajagopal",
    title: "DevOps Engineer",
    tagline: "Building scalable cloud infrastructure and automating deployment pipelines",
    email: "nitinsarveshrg@hotmail.com",
    linkedin: "https://www.linkedin.com/in/nitin-sarvesh-raajagopal/",
    github: "https://github.com/nitinsarveshrg/",
    location: "Toronto, Canada",
    phone: "+1 (437) 989-8997"
  },

  // About Section
  about: {
    bio: "Skilled DevOps Engineer with expertise in cloud infrastructure, automation, CI/CD, and security. Experienced in designing and deploying AWS cloud infrastructures, building automated CI/CD pipelines, and implementing containerization solutions. Proven track record of reducing deployment time by 40% and operational costs by 20% through strategic automation and cloud optimization.",
    highlights: [
      "3+ years of DevOps & Cloud Engineering experience",
      "AWS Certified Solutions Architect – Associate",
      "Expert in Terraform, Docker, Kubernetes & CI/CD automation",
      "Reduced deployment time by 40% and costs by 20%"
    ]
  },

  // Skills organized by category
  skills: {
    cloud: [
      { name: "AWS", level: 90, icon: "cloud" },
      { name: "Azure", level: 80, icon: "cloud" },
      { name: "GCP", level: 70, icon: "cloud" }
    ],
    devops: [
      { name: "Docker", level: 90, icon: "container" },
      { name: "Kubernetes", level: 85, icon: "container" },
      { name: "Jenkins", level: 85, icon: "workflow" },
      { name: "GitLab CI/CD", level: 90, icon: "git-branch" },
      { name: "Terraform", level: 90, icon: "file-code" },
      { name: "Ansible", level: 85, icon: "settings" }
    ],
    programming: [
      { name: "Python", level: 85, icon: "code" },
      { name: "Bash", level: 90, icon: "terminal" },
      { name: "PowerShell", level: 75, icon: "terminal" },
      { name: "SQL", level: 80, icon: "database" }
    ],
    monitoring: [
      { name: "Prometheus", level: 85, icon: "activity" },
      { name: "Grafana", level: 85, icon: "bar-chart" },
      { name: "Nagios", level: 75, icon: "search" },
      { name: "Zabbix", level: 75, icon: "eye" }
    ]
  },

  // Work Experience
  experience: [
    {
      id: 1,
      title: "DevOps Engineer",
      company: "Viva Tech Solutions",
      location: "Toronto, Canada",
      period: "Oct 2022 - Present",
      description: "Designing and deploying AWS cloud infrastructures with focus on automation, security, and cost optimization.",
      achievements: [
        "Designed and deployed AWS cloud infrastructures using EC2, S3, RDS, and VPC, ensuring high availability and resilience",
        "Automated provisioning and configuration management using Terraform and CloudFormation",
        "Built GitLab CI/CD pipelines for deployment automation and rollback strategies",
        "Developed Python scripts for deployment automation, monitoring, and cleanup tasks",
        "Containerized applications using Docker and deployed via Kubernetes with Helm Charts",
        "Enhanced cloud security using IAM roles, policies, and monitoring with AWS Config and Security Hub",
        "Deployed and managed real-time observability with Prometheus and Grafana",
        "Implemented disaster recovery (DR) strategies, including automated backups and cross-region replication",
        "Collaborated in Agile teams to reduce deployment time by 40% and operational cost by 20%"
      ]
    },
    {
      id: 2,
      title: "System Engineer",
      company: "Assistanz Network Pvt Ltd",
      location: "Remote",
      period: "Aug 2021 - Oct 2022",
      description: "Managed and monitored AWS and Azure services for critical business applications.",
      achievements: [
        "Managed and monitored AWS and Azure services for critical business applications",
        "Automated infrastructure tasks using Ansible and Terraform",
        "Integrated Docker containers with Jenkins and GitLab pipelines to streamline deployments",
        "Managed Kubernetes clusters and deployed microservices with Helm Charts",
        "Supported Agile development teams by enabling CI/CD and improving test feedback loops",
        "Resolved issues in production environments, reducing system downtime by 25%"
      ]
    },
    {
      id: 3,
      title: "Junior Cloud Engineer (Intern)",
      company: "Vimana Web Infotech",
      location: "Remote",
      period: "Jul 2020 - Jul 2021",
      description: "Supported cloud infrastructure setup and CI/CD pipeline development.",
      achievements: [
        "Supported the setup and administration of Linux-based servers",
        "Assisted in building CI/CD pipelines with Jenkins, enabling faster deployment cycles",
        "Worked with Docker to containerize applications and deployed them in test environments",
        "Developed and tested Terraform modules for provisioning AWS resources (EC2, S3, IAM)",
        "Monitored system performance using Nagios and Zabbix, contributing to 99.9% uptime",
        "Collaborated in implementing cloud security best practices, including IAM policies and VPC security groups"
      ]
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Automated Deployment of Node.js Microservice on AWS ECS",
      description: "Designed and implemented a fully automated CI/CD pipeline for a Node.js REST API (Product Catalog Service). Developed modular Terraform configurations to provision AWS infrastructure including VPC, ALB, ECS cluster, task definitions, and CloudWatch logging.",
      technologies: ["Terraform", "GitHub Actions", "AWS ECS", "Docker", "Node.js", "ALB", "ECR"],
      highlights: [
        "Zero-downtime blue/green deployments behind ALB",
        "Fully automated CI/CD with GitHub Actions",
        "Infrastructure as Code with modular Terraform",
        "Eliminated manual deployment steps"
      ]
    },
    {
      id: 2,
      title: "Scalable AWS Cost Optimization Platform",
      description: "Designed and developed a cloud-native cost optimization and analytics platform capable of scaling to 10,000+ AWS accounts. Built a FastAPI-based microservice with authentication, caching, structured logging, and circuit-breaker pattern.",
      technologies: ["FastAPI", "Python", "Terraform", "AWS", "CI/CD", "PostgreSQL"],
      highlights: [
        "Scalable to 10,000+ AWS accounts",
        "Cost anomaly detection algorithms",
        "Rightsizing and Reserved Instance planning",
        "Asynchronous processing for high throughput"
      ]
    },
    {
      id: 3,
      title: "Multi-Cloud Infrastructure Automation",
      description: "Automated infrastructure provisioning across AWS and Azure using Terraform and Ansible, enabling consistent deployments and configuration management across multiple cloud platforms.",
      technologies: ["Terraform", "Ansible", "AWS", "Azure", "Python", "GitLab CI"],
      highlights: [
        "Consistent multi-cloud deployments",
        "Reduced provisioning time by 60%",
        "Automated configuration management",
        "Cross-platform compatibility"
      ]
    },
    {
      id: 4,
      title: "Kubernetes Monitoring & Observability Stack",
      description: "Implemented comprehensive monitoring solution for Kubernetes clusters using Prometheus and Grafana with custom dashboards and alerting for proactive incident management.",
      technologies: ["Prometheus", "Grafana", "Kubernetes", "Helm", "AlertManager"],
      highlights: [
        "Real-time cluster monitoring",
        "Custom alerting rules and dashboards",
        "Reduced MTTR by 50%",
        "Proactive incident management"
      ]
    }
  ],

  // Certifications
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "Verified"
    }
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Post Graduate Diploma in Information Technology Network Security",
      institution: "Conestoga College",
      period: "Expected 08/2024",
      location: "Ontario, Canada"
    },
    {
      id: 2,
      degree: "Post Graduate Diploma in Virtualization and Cloud Computing",
      institution: "Conestoga College",
      period: "08/2023",
      location: "Ontario, Canada"
    },
    {
      id: 3,
      degree: "Bachelor of Engineering in Electronics and Communication",
      institution: "Sri Ramakrishna Engineering College",
      period: "05/2021",
      location: "Tamil Nadu, India"
    }
  ]
};
