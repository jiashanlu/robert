# Generated by Django 2.1.7 on 2019-03-24 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_remove_preference_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='json_geocode',
        ),
        migrations.AddField(
            model_name='address',
            name='geocode',
            field=models.CharField(max_length=64, null=True),
        ),
    ]
