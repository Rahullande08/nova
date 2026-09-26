"""Initial 11-model schema with indexes, foreign keys, and soft deletion support

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-09-27 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '0001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Users table
    op.create_table(
        'users',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('name', sa.String(length=128), nullable=False),
        sa.Column('role', sa.String(length=32), nullable=False),
        sa.Column('role_label', sa.String(length=128), nullable=True),
        sa.Column('school_id', sa.String(length=64), nullable=True),
        sa.Column('school_name', sa.String(length=128), nullable=True),
        sa.Column('cluster', sa.String(length=128), nullable=True),
        sa.Column('avatar', sa.String(length=64), server_default='person'),
        sa.Column('language', sa.String(length=10), server_default='MR'),
        sa.Column('password_hash', sa.String(length=256), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_users_id', 'users', ['id'])
    op.create_index('ix_users_role', 'users', ['role'])
    op.create_index('ix_users_school_id', 'users', ['school_id'])

    # Schools table
    op.create_table(
        'schools',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('name', sa.String(length=256), nullable=False),
        sa.Column('block', sa.String(length=128), server_default='Haveli'),
        sa.Column('cluster', sa.String(length=128), server_default='Haveli Cluster'),
        sa.Column('teachers_count', sa.Integer(), server_default='4'),
        sa.Column('students_count', sa.Integer(), server_default='100'),
        sa.Column('priority', sa.String(length=32), server_default='MEDIUM'),
        sa.Column('priority_score', sa.Integer(), server_default='50'),
        sa.Column('days_since_visit', sa.Integer(), server_default='0'),
        sa.Column('flagged_signal', sa.Text(), nullable=True),
        sa.Column('suggested_demo', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=128), server_default='Active'),
        sa.Column('last_evidence', sa.String(length=128), nullable=True),
        sa.Column('reasons', sa.JSON(), nullable=True),
        sa.Column('levels_distribution', sa.JSON(), nullable=True),
        sa.Column('recent_evidence', sa.JSON(), nullable=True),
        sa.Column('mentor_id', sa.String(length=64), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_schools_id', 'schools', ['id'])
    op.create_index('ix_schools_name', 'schools', ['name'])
    op.create_index('ix_schools_priority', 'schools', ['priority'])

    # Evidence table
    op.create_table(
        'evidence',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('teacher_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('teacher_name', sa.String(length=128), nullable=True),
        sa.Column('school_id', sa.String(length=64), sa.ForeignKey('schools.id', ondelete='SET NULL'), nullable=True),
        sa.Column('school_name', sa.String(length=256), nullable=True),
        sa.Column('tracker_image', sa.String(length=512), nullable=True),
        sa.Column('audio_reference', sa.String(length=512), nullable=True),
        sa.Column('audio_url', sa.String(length=512), nullable=True),
        sa.Column('transcript', sa.Text(), nullable=True),
        sa.Column('language', sa.String(length=16), server_default='mr'),
        sa.Column('grade', sa.String(length=32), server_default='Grade 3'),
        sa.Column('captured_at', sa.DateTime(), nullable=True),
        sa.Column('processing_status', sa.String(length=32), server_default='completed'),
        sa.Column('is_archived', sa.Boolean(), server_default='0', nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_evidence_id', 'evidence', ['id'])
    op.create_index('ix_evidence_teacher_id', 'evidence', ['teacher_id'])
    op.create_index('ix_evidence_school_id', 'evidence', ['school_id'])
    op.create_index('ix_evidence_created_at', 'evidence', ['created_at'])

    # Practice Analyses
    op.create_table(
        'practice_analyses',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('evidence_id', sa.String(length=64), sa.ForeignKey('evidence.id', ondelete='CASCADE'), nullable=False),
        sa.Column('overall_confidence', sa.Float(), server_default='0.85'),
        sa.Column('processing_time_sec', sa.Integer(), server_default='12'),
        sa.Column('rubric', sa.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_practice_analyses_id', 'practice_analyses', ['id'])
    op.create_index('ix_practice_analyses_evidence_id', 'practice_analyses', ['evidence_id'])

    # Coaching
    op.create_table(
        'coaching',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('analysis_id', sa.String(length=64), sa.ForeignKey('practice_analyses.id', ondelete='CASCADE'), nullable=False),
        sa.Column('one_next_step', sa.Text(), nullable=False),
        sa.Column('why_this', sa.Text(), nullable=False),
        sa.Column('recommended_activity', sa.JSON(), nullable=True),
        sa.Column('marathi_audio_script', sa.Text(), nullable=True),
        sa.Column('hindi_audio_script', sa.Text(), nullable=True),
        sa.Column('language', sa.String(length=16), server_default='mr'),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_coaching_id', 'coaching', ['id'])
    op.create_index('ix_coaching_analysis_id', 'coaching', ['analysis_id'])

    # Visits
    op.create_table(
        'visits',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('school_id', sa.String(length=64), sa.ForeignKey('schools.id', ondelete='CASCADE'), nullable=False),
        sa.Column('mentor_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('scheduled_date', sa.String(length=32), nullable=True),
        sa.Column('priority', sa.String(length=32), server_default='MEDIUM'),
        sa.Column('reason', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=64), server_default='Scheduled'),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_visits_id', 'visits', ['id'])
    op.create_index('ix_visits_school_id', 'visits', ['school_id'])
    op.create_index('ix_visits_mentor_id', 'visits', ['mentor_id'])

    # Observations
    op.create_table(
        'observations',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('visit_id', sa.String(length=64), nullable=True),
        sa.Column('school_id', sa.String(length=64), sa.ForeignKey('schools.id', ondelete='CASCADE'), nullable=False),
        sa.Column('mentor_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('teacher_name', sa.String(length=128), server_default='Sunita Rao'),
        sa.Column('grade', sa.String(length=32), server_default='Grade 3'),
        sa.Column('transcript', sa.Text(), nullable=True),
        sa.Column('structured_note', sa.Text(), nullable=False),
        sa.Column('suggested_action', sa.Text(), nullable=True),
        sa.Column('rubric_feedback', sa.JSON(), nullable=True),
        sa.Column('whatsapp_draft', sa.Text(), nullable=True),
        sa.Column('verification_status', sa.String(length=32), server_default='Verified'),
        sa.Column('is_archived', sa.Boolean(), server_default='0', nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_observations_id', 'observations', ['id'])
    op.create_index('ix_observations_school_id', 'observations', ['school_id'])
    op.create_index('ix_observations_mentor_id', 'observations', ['mentor_id'])

    # Actions
    op.create_table(
        'actions',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('action', sa.Text(), nullable=False),
        sa.Column('owner', sa.String(length=128), nullable=False),
        sa.Column('target_teacher', sa.String(length=128), nullable=True),
        sa.Column('school', sa.String(length=256), nullable=False),
        sa.Column('school_id', sa.String(length=64), sa.ForeignKey('schools.id', ondelete='SET NULL'), nullable=True),
        sa.Column('created_date', sa.String(length=32), nullable=True),
        sa.Column('due_date', sa.String(length=32), nullable=True),
        sa.Column('status', sa.String(length=32), server_default='Open'),
        sa.Column('priority', sa.String(length=32), server_default='Medium'),
        sa.Column('evidence_required', sa.Text(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('verification_note', sa.Text(), nullable=True),
        sa.Column('last_updated', sa.String(length=64), nullable=True),
        sa.Column('is_archived', sa.Boolean(), server_default='0', nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_actions_id', 'actions', ['id'])
    op.create_index('ix_actions_school_id', 'actions', ['school_id'])
    op.create_index('ix_actions_status', 'actions', ['status'])

    # Training Modules
    op.create_table(
        'training_modules',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('title', sa.String(length=256), nullable=False),
        sa.Column('domain', sa.String(length=128), nullable=False),
        sa.Column('teachers_enrolled', sa.Integer(), server_default='0'),
        sa.Column('teachers_completed', sa.Integer(), server_default='0'),
        sa.Column('adoption_rate', sa.Integer(), server_default='0'),
        sa.Column('verified_shift_rate', sa.Integer(), server_default='0'),
        sa.Column('status', sa.String(length=64), server_default='Active'),
        sa.Column('friction_point', sa.Text(), nullable=True),
        sa.Column('system_action', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_training_modules_id', 'training_modules', ['id'])

    # Notifications
    op.create_table(
        'notifications',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('user_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=True),
        sa.Column('type', sa.String(length=32), server_default='general'),
        sa.Column('title', sa.String(length=256), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('time', sa.String(length=64), server_default='Just now'),
        sa.Column('unread', sa.Boolean(), server_default='1'),
        sa.Column('target_route', sa.String(length=64), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_notifications_id', 'notifications', ['id'])
    op.create_index('ix_notifications_user_id', 'notifications', ['user_id'])
    op.create_index('ix_notifications_unread', 'notifications', ['unread'])

    # Activities
    op.create_table(
        'activities',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('name', sa.String(length=256), nullable=False),
        sa.Column('subject', sa.String(length=128), nullable=False),
        sa.Column('grade', sa.String(length=64), nullable=False),
        sa.Column('target_level', sa.String(length=64), nullable=False),
        sa.Column('duration', sa.String(length=32), server_default='10 min'),
        sa.Column('materials', sa.Text(), nullable=True),
        sa.Column('language', sa.String(length=128), server_default='Marathi / Hindi / English'),
        sa.Column('practice_area', sa.String(length=128), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('steps', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False)
    )
    op.create_index('ix_activities_id', 'activities', ['id'])
    op.create_index('ix_activities_subject', 'activities', ['subject'])
    op.create_index('ix_activities_target_level', 'activities', ['target_level'])

def downgrade() -> None:
    op.drop_table('activities')
    op.drop_table('notifications')
    op.drop_table('training_modules')
    op.drop_table('actions')
    op.drop_table('observations')
    op.drop_table('visits')
    op.drop_table('coaching')
    op.drop_table('practice_analyses')
    op.drop_table('evidence')
    op.drop_table('schools')
    op.drop_table('users')
