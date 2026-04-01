resource "azurerm_postgresql_flexible_server" "pg" {
  name                   = "auralbooks-pg"
  resource_group_name    = var.resource_group_name
  location               = var.location
  administrator_login    = "adminuser"
  administrator_password = "Password123!"

  sku_name = "Standard_D4s_v3"
  version  = "16"
}