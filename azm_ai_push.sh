#!/bin/bash

# سكريبت دفع التغييرات لمشروع AZM AI
# AZM AI Push Script

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

# عرض الفرع الحالي
# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "أنت تعمل الآن على الفرع: $CURRENT_BRANCH"
echo "You are now working on branch: $CURRENT_BRANCH"

# طلب اسم الفرع للدفع إليه
# Ask for branch name to push to
read -p "أدخل اسم الفرع الذي تريد الدفع إليه (اترك فارغاً للفرع الحالي): " BRANCH_NAME

# التحقق من الفرع
# Check branch
if [ -z "$BRANCH_NAME" ]; then
    BRANCH_NAME=$CURRENT_BRANCH
fi

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

# التحقق من إدخال رسالة الارتكاب
# Check if commit message is entered
if [ -z "$COMMIT_MESSAGE" ]; then
    COMMIT_MESSAGE="تحديث مشروع AZM AI"
fi

# ارتكاب التغييرات
# Commit changes
echo "ارتكاب التغييرات..."
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# دفع التغييرات
# Push changes
echo "دفع التغييرات إلى الفرع $BRANCH_NAME..."
echo "Pushing changes to branch $BRANCH_NAME..."
git push origin $BRANCH_NAME

echo "تم دفع التغييرات إلى مشروع AZM AI بنجاح!"
echo "Changes pushed to AZM AI project successfully!"