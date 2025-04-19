#!/bin/bash

# سكريبت إنشاء فرع جديد لمشروع AZM AI
# AZM AI Branch Creation Script

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

# تحديث المستودع المحلي
# Update local repository
echo "تحديث المستودع المحلي..."
echo "Updating local repository..."
git fetch --all

# عرض الفروع المتاحة
# Show available branches
echo "الفروع المتاحة:"
echo "Available branches:"
git branch -a

# طلب اسم الفرع الجديد
# Ask for new branch name
read -p "أدخل اسم الفرع الجديد: " NEW_BRANCH_NAME

# التحقق من إدخال اسم الفرع
# Check if branch name is entered
if [ -z "$NEW_BRANCH_NAME" ]; then
    echo "لم يتم إدخال اسم الفرع. إنهاء العملية."
    echo "No branch name entered. Exiting."
    exit 1
fi

# طلب اسم الفرع الأساسي
# Ask for base branch name
read -p "أدخل اسم الفرع الأساسي (اترك فارغاً لاستخدام main): " BASE_BRANCH_NAME

# التحقق من الفرع الأساسي
# Check base branch
if [ -z "$BASE_BRANCH_NAME" ]; then
    BASE_BRANCH_NAME="main"
fi

# التبديل إلى الفرع الأساسي
# Switch to base branch
echo "التبديل إلى الفرع الأساسي: $BASE_BRANCH_NAME"
echo "Switching to base branch: $BASE_BRANCH_NAME"
git checkout $BASE_BRANCH_NAME

# تحديث الفرع الأساسي
# Update base branch
echo "تحديث الفرع الأساسي..."
echo "Updating base branch..."
git pull origin $BASE_BRANCH_NAME

# إنشاء الفرع الجديد
# Create new branch
echo "إنشاء الفرع الجديد: $NEW_BRANCH_NAME"
echo "Creating new branch: $NEW_BRANCH_NAME"
git checkout -b $NEW_BRANCH_NAME

# دفع الفرع الجديد إلى المستودع البعيد
# Push new branch to remote repository
echo "دفع الفرع الجديد إلى المستودع البعيد..."
echo "Pushing new branch to remote repository..."
git push -u origin $NEW_BRANCH_NAME

echo "تم إنشاء الفرع الجديد $NEW_BRANCH_NAME بنجاح!"
echo "New branch $NEW_BRANCH_NAME created successfully!"
echo "أنت الآن تعمل على الفرع: $NEW_BRANCH_NAME"
echo "You are now working on branch: $NEW_BRANCH_NAME"