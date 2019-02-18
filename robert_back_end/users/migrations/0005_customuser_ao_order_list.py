# Generated by Django 2.1.7 on 2019-02-14 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_auto_20190214_1326'),
        ('users', '0004_customuser_ao_activated'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='AO_order_list',
            field=models.ManyToManyField(blank=True, related_name='AO_order_list', to='orders.Order'),
        ),
    ]
