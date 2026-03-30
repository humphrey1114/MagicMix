# MagicMix GitHub + Vercel 部署说明

## 当前架构说明

- 前端静态页面可直接由 Vercel 托管
- `api/[...path].js` 已适配为 Vercel Function
- 数据库默认会在 Vercel 上写入 `/tmp/magicmix.db`

## 重要限制

- 这是可演示、可持续更新的版本
- 但 `/tmp` 不是持久数据库
- 因此登录、注册、增删改数据在实例重启后可能丢失

如果后续要长期稳定保存业务数据，需要把 SQLite 迁移到外部数据库。

## GitHub 步骤

1. 在 GitHub 新建一个空仓库，例如 `magicmix`
2. 在本地项目根目录执行：

```powershell
git remote add origin <你的仓库地址>
git branch -M main
git add .
git commit -m "Initial MagicMix deploy setup"
git push -u origin main
```

## Vercel 步骤

1. 登录 Vercel
2. 选择 `Add New Project`
3. 导入刚刚的 GitHub 仓库
4. 保持默认构建设置
5. 在环境变量中添加：

```text
DB_PATH=/tmp/magicmix.db
```

6. 点击部署

## 后续更新

- 以后你本地改完代码，只需要：

```powershell
git add .
git commit -m "update"
git push
```

- Vercel 会自动重新部署

## 后续建议

- 如果只是给老师长期看页面和交互，当前方案足够
- 如果要真实长期运营，再补一版外部数据库迁移
