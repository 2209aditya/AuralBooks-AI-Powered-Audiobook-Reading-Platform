resource "azurerm_redis_cache" "redis" {
  name                = "auralbooks-redis"
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 2
  family              = "P"
  sku_name            = "Premium"
}