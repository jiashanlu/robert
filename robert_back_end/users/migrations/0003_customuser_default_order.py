# Generated by Django 2.1.5 on 2019-02-10 05:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20190206_1036'),
        ('users', '0002_auto_20190204_1552'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='default_order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='default_order', to='orders.Order'),
        ),
    ]
