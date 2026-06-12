/*
  User activity timeline - read-only

  How to use:
  1. Change params.user_id.
  2. Change params.start_at and params.end_at.
  3. Keep end_at exclusive: for one full Italian day use:
     start_at = '2026-06-12 00:00:00+02'
     end_at   = '2026-06-13 00:00:00+02'
*/

with params as (
  select
    '00000000-0000-0000-0000-000000000000'::uuid as target_user_id, -- replace with the target user id
    '2026-06-12 00:00:00+02'::timestamptz as start_at,
    '2026-06-13 00:00:00+02'::timestamptz as end_at,
    'Europe/Rome'::text as output_timezone
),
events as (
  select 'auth.users' as source_table, 'account_created' as operation, u.id::text as entity_id, u.created_at as event_at, u.email as title, jsonb_build_object('email', u.email) as details
  from auth.users u, params p
  where u.id = p.target_user_id

  union all
  select 'auth.users', 'email_confirmed', u.id::text, u.confirmed_at, u.email, jsonb_build_object('email', u.email)
  from auth.users u, params p
  where u.id = p.target_user_id and u.confirmed_at is not null

  union all
  select 'auth.users', 'last_sign_in', u.id::text, u.last_sign_in_at, u.email, jsonb_build_object('email', u.email)
  from auth.users u, params p
  where u.id = p.target_user_id and u.last_sign_in_at is not null

  union all
  select 'account_security', 'created', email, created_at, email, jsonb_build_object('failed_login_count', failed_login_count, 'blocked_until', blocked_until)
  from public.account_security, params p
  where user_id = p.target_user_id

  union all
  select 'account_security', 'updated', email, updated_at, email, jsonb_build_object('failed_login_count', failed_login_count, 'blocked_until', blocked_until)
  from public.account_security, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'account_security', 'successful_login', email, last_successful_login, email, jsonb_build_object('failed_login_count', failed_login_count)
  from public.account_security, params p
  where user_id = p.target_user_id and last_successful_login is not null

  union all
  select 'account_security', 'failed_login', email, last_failed_login, email, jsonb_build_object('failed_login_count', failed_login_count)
  from public.account_security, params p
  where user_id = p.target_user_id and last_failed_login is not null

  union all
  select 'account_security', 'terms_accepted', email, terms_accepted_at, email, jsonb_build_object('terms_version', terms_version)
  from public.account_security, params p
  where user_id = p.target_user_id and terms_accepted_at is not null

  union all
  select 'account_security', 'privacy_accepted', email, privacy_accepted_at, email, jsonb_build_object('privacy_version', privacy_version)
  from public.account_security, params p
  where user_id = p.target_user_id and privacy_accepted_at is not null

  union all
  select 'user_sessions', 'session_created', id::text, created_at, concat_ws(' ', platform, app_version), jsonb_build_object('device_name', device_name, 'platform', platform, 'app_version', app_version, 'is_active', is_active)
  from public.user_sessions, params p
  where user_id = p.target_user_id

  union all
  select 'user_sessions', 'login', id::text, login_time, concat_ws(' ', platform, app_version), jsonb_build_object('device_name', device_name, 'platform', platform, 'app_version', app_version, 'is_active', is_active)
  from public.user_sessions, params p
  where user_id = p.target_user_id and login_time is not null

  union all
  select 'user_sessions', 'last_activity', id::text, last_activity, concat_ws(' ', platform, app_version), jsonb_build_object('device_name', device_name, 'platform', platform, 'app_version', app_version, 'is_active', is_active)
  from public.user_sessions, params p
  where user_id = p.target_user_id and last_activity is not null

  union all
  select 'user_sessions', 'session_updated', id::text, updated_at, concat_ws(' ', platform, app_version), jsonb_build_object('device_name', device_name, 'platform', platform, 'app_version', app_version, 'is_active', is_active, 'logout_reason', logout_reason)
  from public.user_sessions, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'user_subscriptions', 'created', id::text, created_at, status, jsonb_build_object('status', status, 'trial_end_date', trial_end_date, 'subscription_plan', subscription_plan)
  from public.user_subscriptions, params p
  where user_id = p.target_user_id

  union all
  select 'user_subscriptions', 'updated', id::text, updated_at, status, jsonb_build_object('status', status, 'trial_end_date', trial_end_date, 'subscription_plan', subscription_plan)
  from public.user_subscriptions, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'employees', 'created', id::text, created_at, concat_ws(' ', first_name, last_name), jsonb_build_object('role', role, 'access_role', access_role, 'has_app_access', has_app_access, 'is_active', is_active)
  from public.employees, params p
  where user_id = p.target_user_id

  union all
  select 'employees', 'updated', id::text, updated_at, concat_ws(' ', first_name, last_name), jsonb_build_object('role', role, 'access_role', access_role, 'has_app_access', has_app_access, 'is_active', is_active)
  from public.employees, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'employees', 'employee_login', id::text, last_login, concat_ws(' ', first_name, last_name), jsonb_build_object('role', role, 'access_role', access_role)
  from public.employees, params p
  where user_id = p.target_user_id and last_login is not null

  union all
  select 'ricette', 'created', id::text, created_at, nome_ricetta, jsonb_build_object('categoria_ricetta', categoria_ricetta, 'is_public', is_public, 'resa_verificata', resa_verificata)
  from public.ricette, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'ricette', 'updated', id::text, updated_at, nome_ricetta, jsonb_build_object('categoria_ricetta', categoria_ricetta, 'is_public', is_public, 'resa_verificata', resa_verificata)
  from public.ricette, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'ingredienti', 'created', id::text, created_at, nome_ingrediente, '{}'::jsonb
  from public.ingredienti, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'ingredienti', 'updated', id::text, updated_at, nome_ingrediente, '{}'::jsonb
  from public.ingredienti, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'ingredienti_override', 'created', id::text, created_at, nome_ingrediente, '{}'::jsonb
  from public.ingredienti_override, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'ingredienti_override', 'updated', id::text, updated_at, nome_ingrediente, '{}'::jsonb
  from public.ingredienti_override, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'semilavorati', 'created', id::text, created_at, nome_semilavorato, '{}'::jsonb
  from public.semilavorati, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'semilavorati', 'updated', id::text, updated_at, nome_semilavorato, '{}'::jsonb
  from public.semilavorati, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'dessert_assemblies', 'created', id::text, created_at, id::text, '{}'::jsonb
  from public.dessert_assemblies, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'dessert_assemblies', 'updated', id::text, updated_at, id::text, '{}'::jsonb
  from public.dessert_assemblies, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'clienti', 'created', id::text, created_at, ragione_sociale, jsonb_build_object('email', email, 'is_deleted', is_deleted)
  from public.clienti, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'clienti', 'updated', id::text, updated_at, ragione_sociale, jsonb_build_object('email', email, 'is_deleted', is_deleted)
  from public.clienti, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'fornitori', 'created', id::text, created_at, ragione_sociale, jsonb_build_object('email', email)
  from public.fornitori, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'fornitori', 'updated', id::text, updated_at, ragione_sociale, jsonb_build_object('email', email)
  from public.fornitori, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'ordini', 'created', id::text, created_at, cliente_nome_snapshot, jsonb_build_object('is_deleted', is_deleted, 'inserito_da', inserito_da_nome_snapshot, 'sede_ordine', sede_ordine_nome_snapshot, 'sede_destinazione', sede_destinazione_nome_snapshot)
  from public.ordini, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'ordini', 'updated', id::text, updated_at, cliente_nome_snapshot, jsonb_build_object('is_deleted', is_deleted, 'inserito_da', inserito_da_nome_snapshot, 'sede_ordine', sede_ordine_nome_snapshot, 'sede_destinazione', sede_destinazione_nome_snapshot)
  from public.ordini, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'righe_ordine', 'created', id::text, created_at, nome_prodotto, jsonb_build_object('quantita', quantita, 'is_deleted', is_deleted)
  from public.righe_ordine, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'righe_ordine', 'updated', id::text, updated_at, nome_prodotto, jsonb_build_object('quantita', quantita, 'is_deleted', is_deleted)
  from public.righe_ordine, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'movimenti_cassa_ordine', 'created', id::text, created_at, causale, jsonb_build_object('importo', importo)
  from public.movimenti_cassa_ordine, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'movimenti_cassa_ordine', 'updated', id::text, updated_at, causale, jsonb_build_object('importo', importo)
  from public.movimenti_cassa_ordine, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'movimenti_magazzino', 'created', id::text, created_at, prodotto_nome, '{}'::jsonb
  from public.movimenti_magazzino, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'movimenti_magazzino', 'updated', id::text, updated_at, prodotto_nome, '{}'::jsonb
  from public.movimenti_magazzino, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'produzioni_programmate', 'created', id::text, created_at, nome_prodotto, '{}'::jsonb
  from public.produzioni_programmate, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'produzioni_programmate', 'updated', id::text, updated_at, nome_prodotto, '{}'::jsonb
  from public.produzioni_programmate, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'notifiche_ordini', 'created', id::text, created_at, id::text, '{}'::jsonb
  from public.notifiche_ordini, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'collocazioni', 'created', id::text, created_at, nome_collocazione, '{}'::jsonb
  from public.collocazioni, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'collocazioni', 'updated', id::text, updated_at, nome_collocazione, '{}'::jsonb
  from public.collocazioni, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'sedi', 'created', id::text, created_at, nome_sede, '{}'::jsonb
  from public.sedi, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'sedi', 'updated', id::text, updated_at, nome_sede, '{}'::jsonb
  from public.sedi, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'user_pastry_profile', 'created', user_id::text, created_at, business_name, jsonb_build_object('business_email', business_email)
  from public.user_pastry_profile, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'user_pastry_profile', 'updated', user_id::text, updated_at, business_name, jsonb_build_object('business_email', business_email)
  from public.user_pastry_profile, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'operational_costs', 'created', id::text, created_at, id::text, '{}'::jsonb
  from public.operational_costs, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'operational_costs', 'updated', id::text, updated_at, id::text, '{}'::jsonb
  from public.operational_costs, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'food_cost_groups', 'created', id::text, created_at, id::text, jsonb_build_object('is_deleted', is_deleted)
  from public.food_cost_groups, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'food_cost_groups', 'updated', id::text, updated_at, id::text, jsonb_build_object('is_deleted', is_deleted)
  from public.food_cost_groups, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'food_cost_versions', 'created', id::text, created_at, id::text, jsonb_build_object('is_deleted', is_deleted)
  from public.food_cost_versions, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'food_cost_versions', 'updated', id::text, updated_at, id::text, jsonb_build_object('is_deleted', is_deleted)
  from public.food_cost_versions, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'recipe_production_history', 'created', id::text, created_at, id::text, jsonb_build_object('production_date', production_date)
  from public.recipe_production_history, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'recipe_production_history', 'updated', id::text, updated_at, id::text, jsonb_build_object('production_date', production_date)
  from public.recipe_production_history, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'recipe_production_history', 'production_date', id::text, production_date::timestamp at time zone p.output_timezone, id::text, jsonb_build_object('production_date', production_date)
  from public.recipe_production_history, params p
  where user_id = p.target_user_id and production_date is not null

  union all
  select 'recipe_sales_history', 'created', id::text, created_at, id::text, jsonb_build_object('sale_date', sale_date)
  from public.recipe_sales_history, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'recipe_sales_history', 'updated', id::text, updated_at, id::text, jsonb_build_object('sale_date', sale_date)
  from public.recipe_sales_history, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'recipe_sales_history', 'sale_date', id::text, sale_date::timestamp at time zone p.output_timezone, id::text, jsonb_build_object('sale_date', sale_date)
  from public.recipe_sales_history, params p
  where user_id = p.target_user_id and sale_date is not null

  union all
  select 'dessert_assembly_production_history', 'created', id::text, created_at, id::text, jsonb_build_object('production_date', production_date)
  from public.dessert_assembly_production_history, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'dessert_assembly_production_history', 'updated', id::text, updated_at, id::text, jsonb_build_object('production_date', production_date)
  from public.dessert_assembly_production_history, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'dessert_assembly_production_history', 'production_date', id::text, production_date::timestamp at time zone p.output_timezone, id::text, jsonb_build_object('production_date', production_date)
  from public.dessert_assembly_production_history, params p
  where user_id = p.target_user_id and production_date is not null

  union all
  select 'dessert_assembly_sales_history', 'created', id::text, created_at, id::text, jsonb_build_object('sale_date', sale_date)
  from public.dessert_assembly_sales_history, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'dessert_assembly_sales_history', 'updated', id::text, updated_at, id::text, jsonb_build_object('sale_date', sale_date)
  from public.dessert_assembly_sales_history, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'dessert_assembly_sales_history', 'sale_date', id::text, sale_date::timestamp at time zone p.output_timezone, id::text, jsonb_build_object('sale_date', sale_date)
  from public.dessert_assembly_sales_history, params p
  where user_id = p.target_user_id and sale_date is not null

  union all
  select 'commercial_product_sales_history', 'created', id::text, created_at, prodotto_nome, jsonb_build_object('sale_date', sale_date)
  from public.commercial_product_sales_history, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'commercial_product_sales_history', 'updated', id::text, updated_at, prodotto_nome, jsonb_build_object('sale_date', sale_date)
  from public.commercial_product_sales_history, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'commercial_product_sales_history', 'sale_date', id::text, sale_date::timestamp at time zone p.output_timezone, prodotto_nome, jsonb_build_object('sale_date', sale_date)
  from public.commercial_product_sales_history, params p
  where user_id = p.target_user_id and sale_date is not null

  union all
  select 'spese_manuali', 'created', id::text, created_at, id::text, jsonb_build_object('expense_date', expense_date, 'is_deleted', is_deleted)
  from public.spese_manuali, params p
  where user_id = p.target_user_id and created_at is not null

  union all
  select 'spese_manuali', 'updated', id::text, updated_at, id::text, jsonb_build_object('expense_date', expense_date, 'is_deleted', is_deleted)
  from public.spese_manuali, params p
  where user_id = p.target_user_id and updated_at is not null

  union all
  select 'spese_manuali', 'expense_date', id::text, expense_date::timestamp at time zone p.output_timezone, id::text, jsonb_build_object('expense_date', expense_date, 'is_deleted', is_deleted)
  from public.spese_manuali, params p
  where user_id = p.target_user_id and expense_date is not null

  union all
  select 'security_audit_log', operation, id::text, operation_time, email, to_jsonb(details)
  from public.security_audit_log, params p
  where user_id = p.target_user_id and operation_time is not null

  union all
  select 'registro_lotti', 'created', id::text, created_at::timestamptz, prodotto_nome, jsonb_build_object('user_email', user_email)
  from public.registro_lotti, params p
  where user_id = p.target_user_id::text
    and created_at is not null
    and pg_input_is_valid(created_at, 'timestamp with time zone')

  union all
  select 'registro_lotti', 'updated', id::text, updated_at::timestamptz, prodotto_nome, jsonb_build_object('user_email', user_email)
  from public.registro_lotti, params p
  where user_id = p.target_user_id::text
    and updated_at is not null
    and pg_input_is_valid(updated_at, 'timestamp with time zone')
)
select
  e.event_at at time zone p.output_timezone as event_time_local,
  e.event_at as event_time_utc,
  e.source_table,
  e.operation,
  e.entity_id,
  e.title,
  e.details
from events e
cross join params p
where e.event_at >= p.start_at
  and e.event_at < p.end_at
order by e.event_at asc, e.source_table asc, e.operation asc;
