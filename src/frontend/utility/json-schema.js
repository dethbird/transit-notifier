import * as _ from 'underscore';

export const initialFields = (schema) => {
    let fields = {};
    _.each(schema.properties, function(def, field) {
        fields[field] = def.default==undefined ? null : def.default;
    });
    return fields;
}

export const buildInputFields = (model, changedFields, schema) => {

    const inputFields = model ? model : initialFields(schema);

    return {
        ... inputFields,
        ... changedFields
    };
}

export const getErrorMessageForProperty = (property, errors) => {
    if (errors) {
        if (errors.properties) {
            const error = _.findWhere(errors.properties, {
                property
            });
            if (error) {
                return error.message;
            }
            return null;
        }
    }
    return null;
}

export const getGlobalErrorMessage = (errors) => {
    if (errors) {
        if (errors.global) {
            return errors.global.message;
        }
        return null;
    }
    return null;
}
