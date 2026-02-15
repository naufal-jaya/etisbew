# Contributing to IEEE Student Branch IPB Website

Thank you for your interest in contributing to the IEEE IPB website! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in the issue tracker
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

### Submitting Changes

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/ieee-ipb-website.git
   cd ieee-ipb-website
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Test your changes locally

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug in component"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## 📝 Code Style Guidelines

### TypeScript/React

- Use functional components with hooks
- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names

```typescript
// Good
const fetchBlogPosts = async (): Promise<Post[]> => {
  const posts = await client.fetch(allPostsQuery);
  return posts;
};

// Avoid
const getData = async () => {
  const data = await client.fetch(query);
  return data;
};
```

### Tailwind CSS

- Use Tailwind utility classes
- Follow mobile-first approach
- Use semantic class names in components

```tsx
// Good
<div className="container mx-auto px-4 py-8 md:py-12">

// Avoid
<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
```

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add newsletter subscription form
fix: resolve navbar mobile menu issue
docs: update README with deployment steps
style: format code with Prettier
refactor: simplify hero component logic
```

## 🏗️ Project Structure

When adding new features:

```
components/
├── layout/          # Layout components (Navbar, Footer)
├── sections/        # Page sections (Hero, About, etc.)
└── ui/             # Reusable UI components

sanity/
├── lib/            # Sanity client and utilities
└── schemas/        # Content type definitions

app/
├── blog/           # Blog routes
├── (other routes)  # Add new routes here
└── api/            # API routes
```

## 🧪 Testing

Before submitting:

1. **Test locally**
   ```bash
   npm run dev
   ```

2. **Build test**
   ```bash
   npm run build
   npm start
   ```

3. **Check for errors**
   ```bash
   npm run lint
   ```

4. **Test responsiveness**
   - Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)

## 📋 Pull Request Checklist

Before submitting a PR:

- [ ] Code follows project style guidelines
- [ ] Changes are tested locally
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Responsive design works on all screen sizes
- [ ] Commit messages follow conventions
- [ ] PR description explains what and why
- [ ] Screenshots included (for UI changes)

## 🎨 Design Guidelines

When making UI changes:

- **Colors**: Use navy blue palette (`navy-*`, `accent-*`)
- **Typography**: Use Inter font with consistent scale
- **Spacing**: Follow 4px grid (4, 8, 12, 16, etc.)
- **Animations**: Keep subtle and smooth
- **Icons**: Use Lucide React icons
- **Glassmorphism**: Use for hero and featured elements

## 🔒 Security

- Never commit sensitive data (API keys, tokens)
- Always use environment variables for secrets
- Validate user inputs
- Follow security best practices

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 💬 Communication

- **Issues**: Use GitHub Issues for bugs and features
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@ieee.ipb.ac.id for sensitive matters

## 🎯 Priority Areas

We especially welcome contributions in:

- Bug fixes
- Performance improvements
- Accessibility enhancements
- Documentation improvements
- Test coverage
- New features (after discussion)

## ❓ Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Ask in GitHub Discussions
4. Contact the maintainers

## 🙏 Thank You!

Every contribution, no matter how small, is valued and appreciated. Thank you for helping improve the IEEE IPB website!

---

**Happy Contributing! 🚀**
