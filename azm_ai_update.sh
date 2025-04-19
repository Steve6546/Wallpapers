#!/bin/bash

# سكريبت تحديث مشروع AZM AI
# AZM AI Update Script

# تعريف المتغيرات
# Define variables
# يجب إدخال الـ token الخاص بك هنا
# You should enter your token here
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
REPO_URL="https://github.com/Steve6546/azm-ai.git"
REPO_URL_WITH_TOKEN="https://${GITHUB_TOKEN}@github.com/Steve6546/azm-ai.git"

# إعداد المستودع البعيد
# Setup remote repository
echo "إعداد المستودع البعيد مع token المصادقة..."
echo "Setting up remote repository with authentication token..."
git remote set-url origin $REPO_URL_WITH_TOKEN

# عرض الفروع المتاحة
# Show available branches
echo "الفروع المتاحة:"
echo "Available branches:"
git branch -a

# طلب اسم الفرع للعمل عليه
# Ask for branch name to work on
read -p "أدخل اسم الفرع الذي تريد العمل عليه (اترك فارغاً للفرع الحالي): " BRANCH_NAME

# التحقق من الفرع
# Check branch
if [ -n "$BRANCH_NAME" ]; then
    git checkout $BRANCH_NAME
fi

# عرض الفرع الحالي
# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "أنت تعمل الآن على الفرع: $CURRENT_BRANCH"
echo "You are now working on branch: $CURRENT_BRANCH"

# سحب آخر التحديثات
# Pull latest updates
echo "جاري سحب آخر التحديثات من المستودع البعيد..."
echo "Pulling latest updates from remote repository..."
git pull origin $CURRENT_BRANCH

# عرض حالة المستودع
# Show repository status
echo "حالة المستودع:"
echo "Repository status:"
git status

# إضافة جميع التغييرات
# Add all changes
echo "إضافة جميع التغييرات..."
echo "Adding all changes..."
git add .

# طلب رسالة الارتكاب
# Ask for commit message
read -p "أدخل رسالة الارتكاب: " COMMIT_MESSAGE

# ارتكاب التغييرات
# Commit changes
echo "ارتكاب التغييرات..."
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# دفع التغييرات
# Push changes
echo "دفع التغييرات إلى المستودع البعيد..."
echo "Pushing changes to remote repository..."
git push origin $CURRENT_BRANCH

echo "تم تحديث مشروع AZM AI بنجاح!"
echo "AZM AI project updated successfully!"