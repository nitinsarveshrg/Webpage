// Real data from Nitin Sarvesh Raajagopal's Resume

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Nitin Sarvesh Raajagopal",
    title: "Cloud DevOps Engineer",
    tagline: "Building secure, scalable multi-cloud infrastructure with automation and observability",
    email: "nitinsarveshrg@hotmail.com",
    linkedin: "https://www.linkedin.com/in/nitin-sarvesh-raajagopal/",
    github: "https://github.com/nitinsarveshrg/",
    location: "Toronto, Canada",
    phone: "+1 (437) 989-8997"
  },

  // About Section
  about: {
    bio: "Cloud DevOps Engineer with ~5 years of experience building secure, scalable multi-cloud infrastructure across AWS, Azure and GCP. Skilled in Infrastructure as Code (Terraform, Helm, Ansible), Kubernetes (CKA) and CI/CD automation (Jenkins, ArgoCD, Github Actions). Strong focus on observability, security and automation to enable fast, reliable and secure deployments.",
    highlights: [
      "5+ years of Cloud & DevOps Engineering experience",
      "AWS & HashiCorp Terraform Certified Professional",
      "Expert in Kubernetes, IaC, and CI/CD automation",
      "Reduced deployment time by 40% and costs by 20%"
    ]
  },

  // Skills organized by category
  skills: {
    cloud: [
      { name: "AWS (IAM, VPC, EC2, EKS, RDS)", level: 95, icon: "cloud" },
      { name: "Azure", level: 85, icon: "cloud" },
      { name: "GCP", level: 80, icon: "cloud" }
    ],
    devops: [
      { name: "Docker", level: 95, icon: "container" },
      { name: "Kubernetes", level: 95, icon: "container" },
      { name: "Helm", level: 90, icon: "package" },
      { name: "Terraform", level: 95, icon: "file-code" },
      { name: "Ansible", level: 90, icon: "settings" },
      { name: "Jenkins", level: 90, icon: "workflow" },
      { name: "GitHub Actions", level: 90, icon: "git-branch" },
      { name: "ArgoCD", level: 85, icon: "git-merge" }
    ],
    programming: [
      { name: "Python", level: 90, icon: "code" },
      { name: "Bash", level: 95, icon: "terminal" },
      { name: "SQL", level: 85, icon: "database" },
      { name: "JavaScript/TypeScript", level: 75, icon: "code" }
    ],
    monitoring: [
      { name: "Prometheus", level: 90, icon: "activity" },
      { name: "Grafana", level: 90, icon: "bar-chart" },
      { name: "ELK Stack", level: 85, icon: "search" },
      { name: "CloudWatch", level: 90, icon: "eye" },
      { name: "Dynatrace", level: 80, icon: "activity" },
      { name: "DataDog", level: 80, icon: "trending-up" }
    ]
  },

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Cloud DevOps Engineer",
      company: "Viva Tech Solutions",
      location: "Toronto, Canada",
      period: "Oct 2022 - Present",
      description: "Designing, deploying, and optimizing multi-cloud infrastructure with focus on automation, security, and observability.",
      achievements: [
        "Designed and optimized AWS cloud infrastructure improving availability to 99.99% and reducing latency by 30%",
        "Automated multi-environment IaC using Terraform & CloudFormation, reducing setup time by 85%",
        "Built end-to-end GitLab CI/CD pipelines reducing deployment errors by 40% and accelerating releases by 2x",
        "Developed Python automation frameworks cutting manual ops effort by 60%",
        "Containerized microservices using Docker and Kubernetes + Helm, reducing release overhead by 50%",
        "Strengthened cloud security with IAM, encryption, AWS Config reducing security findings by 70%",
        "Deployed Prometheus & Grafana observability stack reducing MTTR by 45%",
        "Implemented DR & cross-region replication achieving 100% successful DR drills",
        "Drove cloud efficiency initiatives reducing AWS costs by 20%"
      ]
    },
    {
      id: 2,
      title: "System Engineer",
      company: "Assistanz Network Pvt Ltd",
      location: "India",
      period: "Aug 2021 - Oct 2022",
      description: "Managed AWS & Azure production workloads ensuring high availability and performance.",
      achievements: [
        "Managed AWS & Azure workloads ensuring 99.9% uptime across mission-critical applications",
        "Automated provisioning using Ansible & Terraform reducing manual intervention by 50%",
        "Integrated Dockerized services into Jenkins/GitLab CI/CD reducing build times by 30%",
        "Administered Kubernetes clusters and deployed microservices using Helm",
        "Optimized CI/CD pipelines reducing test cycle time by 40%",
        "Resolved cloud & Kubernetes incidents reducing downtime by 35%"
      ]
    },
    {
      id: 3,
      title: "Junior Cloud Engineer (Intern)",
      company: "Vimana Web Infotech",
      location: "India",
      period: "May 2020 - Jul 2021",
      description: "Supported cloud infrastructure setup, automation, and CI/CD pipeline development.",
      achievements: [
        "Automated Linux server tasks with Python & Bash reducing manual effort by 55%",
        "Built Jenkins CI/CD pipelines improving deployment cycle times by 35%",
        "Containerized applications using Docker reducing configuration drift by 80%",
        "Developed reusable Terraform modules increasing IaC standardization by 60%",
        "Monitored infrastructure using Nagios & Zabbix maintaining 99.9% uptime",
        "Implemented cloud security best practices reducing unauthorized access risks by 40%"
      ]
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Automated Deployment of Node.js Microservice on AWS ECS",
      description: "Designed and implemented a fully automated CI/CD pipeline for a Node.js REST API (Product Catalog Service). Developed modular Terraform configurations to provision AWS infrastructure including VPC, ALB, ECS cluster, task definitions, and CloudWatch logging. Configured GitHub Actions workflows for automated blue/green ECS deployments.",
      technologies: ["Node.js", "AWS ECS", "Terraform", "GitHub Actions", "Docker", "Amazon ECR", "ALB", "VPC", "CloudWatch"],
      highlights: [
        "Zero-downtime blue/green deployments behind ALB",
        "Fully automated CI/CD with GitHub Actions",
        "Infrastructure as Code with modular Terraform",
        "Eliminated manual deployment steps"
      ],
      github: "https://github.com/nitinsarveshrg/Product-Catalog-for-health-applications-using-API"
    },
    {
      id: 2,
      title: "Scalable AWS Cost Optimization Platform",
      description: "Designed and developed a cloud-native cost optimization and analytics platform capable of scaling to 10,000+ AWS accounts. Built a FastAPI-based microservice with authentication, caching, structured logging, and circuit-breaker pattern. Implemented cost anomaly detection and optimization algorithms for rightsizing, Reserved Instance planning, and lifecycle-based storage cost reduction.",
      technologies: ["FastAPI", "AWS (EC2, RDS, S3)", "Terraform", "CI/CD", "Python", "Asynchronous Processing"],
      highlights: [
        "Scalable to 10,000+ AWS accounts",
        "Cost anomaly detection algorithms",
        "Rightsizing and Reserved Instance planning",
        "Asynchronous processing for high throughput"
      ],
      github: "https://github.com/nitinsarveshrg/Cloud-Cost-Analysis"
    },
    {
      id: 3,
      title: "Multi-Cloud Infrastructure Automation with Azure DevOps",
      description: "Implemented cross-cloud infrastructure provisioning using Azure DevOps pipelines to manage AWS resources. Built automated CI/CD workflows that provision and configure AWS services including VPC, EC2, RDS, and S3 using Terraform modules. Achieved seamless integration between Azure DevOps and AWS cloud, enabling consistent infrastructure deployment patterns across hybrid cloud environments.",
      technologies: ["Azure DevOps", "AWS", "Terraform", "CI/CD Pipelines", "YAML", "Infrastructure as Code"],
      highlights: [
        "Hybrid cloud automation (Azure DevOps + AWS)",
        "Reusable Terraform modules for AWS services",
        "Automated infrastructure provisioning",
        "Cross-platform CI/CD integration"
      ],
      github: "https://github.com/nitinsarveshrg/Creation-of-AWS-services-using-Azure-Devops"
    }
  ],

  // Certifications with links
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-SAA",
      link: "https://www.credly.com/badges/b37d7130-a1fd-4123-9325-ea53260945cd/linked_in_profile"
    },
    {
      id: 2,
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2024",
      credentialId: "HC-TF",
      link: "https://www.credly.com/badges/fc7bd115-3657-4551-9746-c5b3357a12bd/linked_in_profile"
    }
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Post Graduate Diploma in Information Technology Network Security",
      institution: "Conestoga College",
      period: "Jan 2024 - Aug 2024",
      location: "Waterloo, Canada",
      gpa: "3.32/4"
    },
    {
      id: 2,
      degree: "Post Graduate Diploma in Virtualization and Cloud Computing",
      institution: "Conestoga College",
      period: "Jan 2023 - Aug 2023",
      location: "Waterloo, Canada",
      gpa: "3.67/4"
    },
    {
      id: 3,
      degree: "Bachelor of Engineering in Electronics and Communication",
      institution: "Sri Ramakrishna Engineering College",
      period: "Aug 2017 - May 2021",
      location: "Coimbatore, India",
      gpa: "7.52/10"
    }
  ]
};
