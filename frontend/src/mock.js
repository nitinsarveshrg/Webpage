// Mock data for Cloud/DevOps Portfolio
// Replace this data with your actual LinkedIn information

export const portfolioData = {
  // Personal Information
  personal: {
    name: "Nitin Sarvesh Raajagopal",
    title: "Cloud & DevOps Engineer",
    tagline: "Building scalable cloud infrastructure and automating deployment pipelines",
    email: "nitin.raajagopal@example.com",
    linkedin: "https://www.linkedin.com/in/nitin-sarvesh-raajagopal/",
    github: "https://github.com/yourusername",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567"
  },

  // About Section
  about: {
    bio: "Experienced Cloud and DevOps Engineer with 5+ years of expertise in designing, implementing, and managing scalable cloud infrastructure. Passionate about automation, CI/CD, and building robust systems that enable teams to deploy with confidence. Proven track record of reducing deployment times by 70% and improving system reliability through infrastructure as code and modern DevOps practices.",
    highlights: [
      "5+ years in Cloud & DevOps Engineering",
      "AWS & Azure Certified Professional",
      "Expert in Kubernetes & Container Orchestration",
      "Infrastructure as Code Specialist"
    ]
  },

  // Skills organized by category
  skills: {
    cloud: [
      { name: "AWS", level: 95, icon: "cloud" },
      { name: "Azure", level: 85, icon: "cloud" },
      { name: "Google Cloud Platform", level: 75, icon: "cloud" }
    ],
    devops: [
      { name: "Docker", level: 95, icon: "container" },
      { name: "Kubernetes", level: 90, icon: "container" },
      { name: "Jenkins", level: 85, icon: "workflow" },
      { name: "GitLab CI/CD", level: 90, icon: "git-branch" },
      { name: "Terraform", level: 95, icon: "file-code" },
      { name: "Ansible", level: 85, icon: "settings" }
    ],
    programming: [
      { name: "Python", level: 90, icon: "code" },
      { name: "Bash/Shell", level: 95, icon: "terminal" },
      { name: "Go", level: 75, icon: "code" },
      { name: "YAML/JSON", level: 95, icon: "file-json" }
    ],
    monitoring: [
      { name: "Prometheus", level: 85, icon: "activity" },
      { name: "Grafana", level: 85, icon: "bar-chart" },
      { name: "ELK Stack", level: 80, icon: "search" },
      { name: "DataDog", level: 75, icon: "eye" }
    ]
  },

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Senior Cloud DevOps Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      description: "Leading cloud infrastructure and DevOps initiatives for enterprise applications.",
      achievements: [
        "Architected and deployed multi-region AWS infrastructure serving 5M+ users",
        "Reduced deployment time from 2 hours to 15 minutes using GitLab CI/CD",
        "Implemented Infrastructure as Code using Terraform, managing 200+ resources",
        "Led migration of monolithic applications to microservices on Kubernetes"
      ]
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "Cloud Innovations Ltd.",
      location: "Austin, TX",
      period: "Mar 2020 - Dec 2021",
      description: "Managed CI/CD pipelines and cloud infrastructure for SaaS products.",
      achievements: [
        "Built automated deployment pipelines for 15+ microservices",
        "Implemented monitoring and alerting system using Prometheus & Grafana",
        "Reduced infrastructure costs by 40% through resource optimization",
        "Automated backup and disaster recovery processes"
      ]
    },
    {
      id: 3,
      title: "Junior DevOps Engineer",
      company: "StartUp Tech",
      location: "Remote",
      period: "Jun 2019 - Feb 2020",
      description: "Supported development teams with CI/CD and infrastructure management.",
      achievements: [
        "Set up Jenkins pipelines for automated testing and deployment",
        "Managed AWS EC2, RDS, and S3 resources",
        "Implemented configuration management using Ansible",
        "Created documentation for deployment procedures"
      ]
    }
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: "Multi-Cloud Kubernetes Platform",
      description: "Designed and implemented a multi-cloud Kubernetes platform supporting AWS and Azure, enabling seamless workload migration and high availability.",
      technologies: ["Kubernetes", "Terraform", "AWS EKS", "Azure AKS", "Helm"],
      highlights: [
        "99.99% uptime across multiple regions",
        "Automated failover between cloud providers",
        "Managed 50+ microservices"
      ]
    },
    {
      id: 2,
      title: "CI/CD Pipeline Automation",
      description: "Built comprehensive CI/CD pipeline framework supporting multiple programming languages with automated testing, security scanning, and deployment.",
      technologies: ["GitLab CI", "Docker", "SonarQube", "Trivy", "ArgoCD"],
      highlights: [
        "Reduced deployment time by 70%",
        "Integrated security scanning in pipeline",
        "Zero-downtime deployments"
      ]
    },
    {
      id: 3,
      title: "Infrastructure as Code Framework",
      description: "Developed reusable Terraform modules for provisioning cloud infrastructure across AWS and Azure with built-in security and compliance.",
      technologies: ["Terraform", "AWS", "Azure", "Python", "GitHub Actions"],
      highlights: [
        "Reduced provisioning time by 80%",
        "Enforced security best practices",
        "Used by 10+ development teams"
      ]
    },
    {
      id: 4,
      title: "Observability Platform",
      description: "Implemented comprehensive monitoring and observability solution for microservices architecture with custom dashboards and alerting.",
      technologies: ["Prometheus", "Grafana", "Loki", "Jaeger", "AlertManager"],
      highlights: [
        "Real-time monitoring of 100+ services",
        "Custom alerting rules and runbooks",
        "Reduced MTTR by 60%"
      ]
    }
  ],

  // Certifications
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "ABC123XYZ"
    },
    {
      id: 2,
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      credentialId: "LF-123456"
    },
    {
      id: 3,
      name: "Microsoft Azure DevOps Engineer Expert",
      issuer: "Microsoft",
      date: "2022",
      credentialId: "MS-987654"
    },
    {
      id: 4,
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2021",
      credentialId: "HC-456789"
    }
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California",
      period: "2015 - 2019",
      location: "Berkeley, CA"
    }
  ]
};
