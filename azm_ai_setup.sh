#!/bin/bash

# سكريبت إعداد مشروع AZM AI
# AZM AI Setup Script

# تعريف المتغيرات
# Define variables
# يجب إدخال الـ token الخاص بك هنا
# You should enter your token here
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
REPO_URL="https://github.com/Steve6546/azm-ai.git"
REPO_URL_WITH_TOKEN="https://${GITHUB_TOKEN}@github.com/Steve6546/azm-ai.git"

# إعداد Git
# Setup Git
echo "إعداد معلومات Git..."
echo "Setting up Git information..."
git config --global user.name "AZM AI Developer"
git config --global user.email "dev@azm-ai.com"

# إعداد المستودع البعيد
# Setup remote repository
echo "إعداد المستودع البعيد مع token المصادقة..."
echo "Setting up remote repository with authentication token..."
git remote set-url origin $REPO_URL_WITH_TOKEN

# التحقق من الإعداد
# Verify setup
echo "التحقق من الإعداد..."
echo "Verifying setup..."
git remote -v

echo "تم إعداد مشروع AZM AI بنجاح!"
echo "AZM AI project setup completed successfully!"

# عرض الفروع المتاحة
# Show available branches
echo "الفروع المتاحة:"
echo "Available branches:"
git branch -a

# تحديث المستودع المحلي
# Update local repository
echo "تحديث المستودع المحلي..."
echo "Updating local repository..."
git pull

echo "تم الانتهاء من إعداد وتحديث مشروع AZM AI."
echo "AZM AI project setup and update completed."