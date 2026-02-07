use anchor_lang::prelude::*;

declare_id!("4QauPewhHDE1jTNUypZZwqeoMPdTzNtc12QKVxYvgemk");

#[program]
pub mod calculator {
    use super::*;

    pub fn init(ctx: Context<Initialize>, init_value: u32) -> Result<()> {
        ctx.accounts.account.num = init_value;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, num:u32) -> Result<()> {
        ctx.accounts.account.num = ctx.accounts.account.num + num;
        Ok(())
    }

    pub fn sub(ctx: Context<Sub>, num:u32) -> Result<()> {
        ctx.accounts.account.num = ctx.accounts.account.num - num;
        Ok(())
    }

    pub fn mul(ctx: Context<Mul>, num:u32) -> Result<()> {
        ctx.accounts.account.num = ctx.accounts.account.num * num;
        Ok(())
    }

    pub fn div(ctx: Context<Div>, num:u32) -> Result<()> {
        ctx.accounts.account.num = ctx.accounts.account.num / num;
        Ok(())
    }
}

#[account]
struct DataShape{
    pub num: u32
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Sub<'info> {
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Mul<'info> {
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>
}

#[derive(Accounts)]
pub struct Div<'info> {
    #[account(mut)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>
}

