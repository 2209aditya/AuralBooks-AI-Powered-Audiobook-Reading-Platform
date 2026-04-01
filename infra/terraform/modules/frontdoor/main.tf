resource "azurerm_key_vault" "kv" {
  name                        = "auralbooks-kv"
  location                    = var.location
  resource_group_name         = var.resource_group_name
  tenant_id                   = "YOUR-TENANT-ID"
  sku_name                    = "standard"
}